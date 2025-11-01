import React, { useMemo } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

import Key from "./Key";
import MidiNumbers from "./MidiNumbers";
import styles from "./styles";

type NoteRange = { first: number; last: number };

type KeyboardProps = {
    noteRange: NoteRange;
    activeNotes: ReadonlyArray<number>;
    onNoteOn: (midiNumber: number) => void;
    onNoteOff: (midiNumber: number) => void;
    renderNoteLabel?: (args: {
        midiNumber: number;
        isActive: boolean;
        isAccidental: boolean;
    }) => React.ReactNode;
    keyWidthToHeight?: number;
    disabled?: boolean;
    gliss?: boolean;
    width?: number;
    style?: StyleProp<ViewStyle>;
};

const range = (start: number, end: number): number[] =>
    Array.from({ length: end - start + 1 }, (_, i) => start + i);

function Keyboard({
    noteRange,
    activeNotes,
    onNoteOn,
    onNoteOff,
    renderNoteLabel = () => null,
    keyWidthToHeight = 0.33,
    disabled = false,
    gliss = false,
    width,
    style,
}: KeyboardProps) {
    const midiNumbers: number[] = useMemo(
        () => range(noteRange.first, noteRange.last),
        [noteRange]
    );
    const naturalKeyCount = midiNumbers.filter(
        (n) => !MidiNumbers.getAttributes(n).isAccidental
    ).length;
    const naturalKeyWidth = 1 / naturalKeyCount;
    // Measure container width on mobile for pixel-perfect key positioning.
    const [measuredWidth, setMeasuredWidth] = React.useState<
        number | undefined
    >(typeof width === "number" ? width : undefined);

    const isFixedPixel = typeof measuredWidth === "number";
    const keyWidthPx = isFixedPixel
        ? (measuredWidth as number) * naturalKeyWidth
        : undefined;

    const containerHeight = React.useMemo(() => {
        if (!isFixedPixel) return "100%";
        return (keyWidthPx as number) / keyWidthToHeight;
    }, [isFixedPixel, keyWidthPx, keyWidthToHeight]);

    return (
        <View
            style={[
                styles.keyboard,
                {
                    width:
                        typeof measuredWidth === "number"
                            ? measuredWidth
                            : "100%",
                    height: containerHeight,
                },
                style,
            ]}
            onLayout={(e) => {
                // If width prop provided (pixels), measuredWidth initialized to it; otherwise measure.
                if (typeof width !== "number") {
                    const w = e.nativeEvent.layout.width;
                    if (w && w > 0 && w !== measuredWidth) setMeasuredWidth(w);
                }
            }}
        >
            {midiNumbers.map((midiNumber) => {
                const { isAccidental } = MidiNumbers.getAttributes(midiNumber);
                const isActive = !disabled && activeNotes.includes(midiNumber);

                return (
                    <Key
                        key={midiNumber}
                        midiNumber={midiNumber}
                        noteRange={noteRange}
                        // Pass pixel width when available, otherwise allow Key to render
                        // using fractional widths (it will convert to percent strings).
                        keyWidthPx={keyWidthPx}
                        naturalKeyWidthFraction={naturalKeyWidth}
                        active={isActive}
                        accidental={isAccidental}
                        disabled={disabled}
                        onNoteOn={onNoteOn}
                        onNoteOff={onNoteOff}
                        gliss={gliss}
                        renderNoteLabel={renderNoteLabel}
                    />
                );
            })}
        </View>
    );
}

export default React.memo(Keyboard);
