import React, { useMemo, useState } from "react";
import { StyleProp, View, ViewStyle } from "react-native";

import Key from "./Key";
import MidiNumbers from "./midiNumbers";
import { HapticsStrength } from "./Piano";
import getStyles, { DEFAULTS } from "./styles";

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
    whiteKeyColor?: string;
    blackKeyColor?: string;
    borderWidth?: number;
    borderColor?: string;
    pressedColor?: string;
    disabledBorderWidth?: number;
    disabledBorderColor?: string;
    disabledKeyColor?: string;
    blackKeyHeight?: number;
    whiteKeyHeight?: number;
    keyShrinkPercent?: number;
    pressDepth?: number;
    noteLabelWhiteColor?: string;
    noteLabelBlackColor?: string;

    keyLiftOn?: boolean;
    pressHapticOn?: boolean;
    releaseHapticOn?: boolean;
    hapticsStrength?: HapticsStrength;
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
    whiteKeyColor,
    blackKeyColor,
    borderWidth,
    borderColor,
    pressedColor,
    disabledBorderWidth,
    disabledBorderColor,
    disabledKeyColor,
    blackKeyHeight,
    whiteKeyHeight,
    keyShrinkPercent,
    pressDepth,
    noteLabelWhiteColor,
    noteLabelBlackColor,

    keyLiftOn,
    pressHapticOn,
    releaseHapticOn,
    hapticsStrength,
}: KeyboardProps) {
    const styles = useMemo(
        () =>
            getStyles({
                whiteKeyColor: whiteKeyColor ?? DEFAULTS.WHITE_KEY_COLOR,
                blackKeyColor: blackKeyColor ?? DEFAULTS.BLACK_KEY_COLOR,
                borderWidth: borderWidth ?? DEFAULTS.BORDER_WIDTH,
                borderColor: borderColor ?? DEFAULTS.BORDER_COLOR,
                pressedColor: pressedColor ?? DEFAULTS.PRESSED_COLOR,
                noteLabelWhiteColor:
                    noteLabelWhiteColor ?? DEFAULTS.NOTE_LABEL_WHITE_COLOR,
                noteLabelBlackColor:
                    noteLabelBlackColor ?? DEFAULTS.NOTE_LABEL_BLACK_COLOR,
            }),
        [whiteKeyColor, blackKeyColor, borderWidth, borderColor, pressedColor]
    );

    const midiNumbers: number[] = useMemo(
        () => range(noteRange.first, noteRange.last),
        [noteRange]
    );
    const naturalKeyCount = midiNumbers.filter(
        (n) => !MidiNumbers.getAttributes(n).isAccidental
    ).length;
    const naturalKeyWidth = 1 / naturalKeyCount;
    // Measure container width on mobile for pixel-perfect key positioning.
    const [measuredWidth, setMeasuredWidth] = useState<number | undefined>(
        typeof width === "number" ? width : undefined
    );

    const isFixedPixel = typeof measuredWidth === "number";
    const keyWidthPx = isFixedPixel
        ? (measuredWidth as number) * naturalKeyWidth
        : undefined;

    const containerHeight = React.useMemo(() => {
        if (!isFixedPixel) return whiteKeyHeight ?? DEFAULTS.WHITE_KEY_HEIGHT;
        const calculatedHeight =
            (keyWidthPx as number) * (1 / keyWidthToHeight);
        return Math.max(
            calculatedHeight,
            whiteKeyHeight ?? DEFAULTS.WHITE_KEY_HEIGHT
        );
    }, [isFixedPixel, keyWidthPx, keyWidthToHeight, whiteKeyHeight]);

    const scaledBlackKeyHeight = Math.round(
        (blackKeyHeight ?? DEFAULTS.BLACK_KEY_HEIGHT_RATIO) *
            (whiteKeyHeight ?? DEFAULTS.WHITE_KEY_HEIGHT)
    );

    return (
        <View
            style={[
                styles.keyboard,
                {
                    position: "relative",
                    overflow: "hidden",
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
                        whiteKeyColor={
                            whiteKeyColor ?? DEFAULTS.WHITE_KEY_COLOR
                        }
                        blackKeyColor={
                            blackKeyColor ?? DEFAULTS.BLACK_KEY_COLOR
                        }
                        borderWidth={borderWidth ?? DEFAULTS.BORDER_WIDTH}
                        borderColor={borderColor ?? DEFAULTS.BORDER_COLOR}
                        pressedColor={pressedColor ?? DEFAULTS.PRESSED_COLOR}
                        disabledBorderWidth={disabledBorderWidth}
                        disabledBorderColor={disabledBorderColor}
                        disabledKeyColor={disabledKeyColor}
                        blackKeyHeight={scaledBlackKeyHeight}
                        whiteKeyHeight={
                            whiteKeyHeight ?? DEFAULTS.WHITE_KEY_HEIGHT
                        }
                        keyShrinkPercent={keyShrinkPercent}
                        pressDepth={pressDepth ?? DEFAULTS.PRESS_DEPTH}
                        noteLabelWhiteColor={noteLabelWhiteColor}
                        noteLabelBlackColor={noteLabelBlackColor}
                        keyLiftOn={keyLiftOn}
                        pressHapticOn={pressHapticOn}
                        releaseHapticOn={releaseHapticOn}
                        hapticsStrength={hapticsStrength}
                    />
                );
            })}
        </View>
    );
}

export default React.memo(Keyboard);
