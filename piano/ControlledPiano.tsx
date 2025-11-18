import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import { StyleProp, View, ViewStyle } from "react-native";

import Keyboard from "./Keyboard";
import getStyles, { DEFAULTS } from "./styles";
import { HapticsStrength } from "./Piano";

type ControlledPianoProps = {
    noteRange: { first: number; last: number };
    activeNotes: ReadonlyArray<number>;
    playNote: (midiNumber: number) => void;
    stopNote: (midiNumber: number) => void;
    onNoteOn: (
        midiNumber: number,
        prevActiveNotes: ReadonlyArray<number>
    ) => void;
    onNoteOff: (
        midiNumber: number,
        prevActiveNotes: ReadonlyArray<number>
    ) => void;
    renderNoteLabel?: (args: {
        midiNumber: number;
        isActive: boolean;
        isAccidental: boolean;
    }) => React.ReactNode;
    disabled?: boolean;
    width?: number;
    keyWidthToHeight?: number;
    style?: StyleProp<ViewStyle>;
    whiteKeyColor?: string;
    blackKeyColor?: string;
    borderWidth?: number;
    borderColor?: string;
    pressedColor?: string;
    disabledBorderWidth?: number;
    disabledBorderColor?: string;
    disabledKeyColor?: string;
    blackToWhiteKeyHeightProportion?: number;
    keyShrinkPercent?: number;
    pressDepth?: number;
    noteLabelWhiteColor?: string;
    noteLabelBlackColor?: string;

    glissandoOn?: boolean;
    keyLiftOn?: boolean,
    pressHapticOn?: boolean,
    releaseHapticOn?: boolean,
    hapticsStrength?: HapticsStrength,
};

function ControlledPiano({
    noteRange,
    activeNotes,
    playNote,
    stopNote,
    onNoteOn,
    onNoteOff,
    renderNoteLabel = () => null,
    disabled,
    width,
    keyWidthToHeight,
    style,
    whiteKeyColor,
    blackKeyColor,
    borderWidth,
    borderColor,
    pressedColor,
    disabledBorderWidth,
    disabledBorderColor,
    disabledKeyColor,
    blackToWhiteKeyHeightProportion,
    keyShrinkPercent,
    pressDepth,
    noteLabelWhiteColor,
    noteLabelBlackColor,

    glissandoOn,
    keyLiftOn,
    pressHapticOn,
    releaseHapticOn,
    hapticsStrength,
}: ControlledPianoProps) {
    const styles = useMemo(
        () =>
            getStyles({
                whiteKeyColor: whiteKeyColor ?? DEFAULTS.WHITE_KEY_COLOR,
                blackKeyColor: blackKeyColor ?? DEFAULTS.BLACK_KEY_COLOR,
                borderWidth: borderWidth ?? DEFAULTS.BORDER_WIDTH,
                borderColor: borderColor ?? DEFAULTS.BORDER_COLOR,
                pressedColor: pressedColor ?? DEFAULTS.PRESSED_COLOR,
                noteLabelWhiteColor: noteLabelWhiteColor ?? DEFAULTS.NOTE_LABEL_WHITE_COLOR,
                noteLabelBlackColor: noteLabelBlackColor ?? DEFAULTS.NOTE_LABEL_BLACK_COLOR,
            }),
        [whiteKeyColor, blackKeyColor, borderWidth, borderColor, pressedColor]
    );
    const prevActiveNotesRef = useRef(activeNotes);
    useEffect(() => {
        if (disabled) return;
        const prev = prevActiveNotesRef.current;
        const next = activeNotes;
        next.filter((n) => !prev.includes(n)).forEach(playNote);
        prev.filter((n) => !next.includes(n)).forEach(stopNote);
        prevActiveNotesRef.current = next;
    }, [activeNotes, disabled, playNote, stopNote]);

    // If the component becomes disabled, ensure any active notes are released.
    useEffect(() => {
        if (!disabled) return;
        const prev = prevActiveNotesRef.current;
        prev.forEach((n) => {
            try {
                onNoteOff(n, prev);
            } catch (_) {
                // swallow errors from consumer handlers; ensure sound stops
            }
            try {
                stopNote(n);
            } catch (_) {}
        });
        prevActiveNotesRef.current = [];
    }, [disabled, onNoteOff, stopNote]);

    // Cleanup on unmount: ensure no lingering sounds remain.
    useEffect(() => {
        return () => {
            const prev = prevActiveNotesRef.current;
            prev.forEach((n) => {
                try {
                    stopNote(n);
                } catch (_) {}
            });
        };
    }, [stopNote]);

    const handleNoteOn = useCallback(
        (midiNumber: number) => {
            if (disabled) return;
            onNoteOn(midiNumber, activeNotes);
        },
        [disabled, onNoteOn, activeNotes]
    );

    const handleNoteOff = useCallback(
        (midiNumber: number) => {
            if (disabled) return;
            onNoteOff(midiNumber, activeNotes);
        },
        [disabled, onNoteOff, activeNotes]
    );

    const [isTouchDown, setIsTouchDown] = useState(false);

    /**
     * Stabilize renderNoteLabel reference passed to deep children.
     *
     * Note: we still depend on the incoming `renderNoteLabel` function. If
     * consumers pass a new inline function on every render they will still
     * trigger re-renders. This wrapper ensures the identity that Keyboard
     * receives is stable between renders unless the function itself changes.
     */
    const stableRenderNoteLabel = useCallback(
        (args: {
            midiNumber: number;
            isActive: boolean;
            isAccidental: boolean;
        }) => renderNoteLabel(args),
        [renderNoteLabel]
    );

    const keyboardProps = useMemo(
        () => ({
            noteRange,
            onNoteOn: handleNoteOn,
            onNoteOff: handleNoteOff,
            activeNotes,
            disabled,
            width,
            keyWidthToHeight,
            gliss: isTouchDown,
            renderNoteLabel: stableRenderNoteLabel,
            whiteKeyColor,
            blackKeyColor,
            borderWidth,
            borderColor,
            pressedColor,
            disabledBorderWidth,
            disabledBorderColor,
            disabledKeyColor,
            blackToWhiteKeyHeightProportion,
            keyShrinkPercent,
            pressDepth,
            noteLabelWhiteColor,
            noteLabelBlackColor,
            keyLiftOn,
            pressHapticOn,
            releaseHapticOn,
            hapticsStrength,
        }),
        [
            noteRange,
            handleNoteOn,
            handleNoteOff,
            activeNotes,
            disabled,
            width,
            keyWidthToHeight,
            isTouchDown,
            stableRenderNoteLabel,
            whiteKeyColor,
            blackKeyColor,
            borderWidth,
            borderColor,
            pressedColor,
            disabledBorderWidth,
            disabledBorderColor,
            disabledKeyColor,
            blackToWhiteKeyHeightProportion,
            keyShrinkPercent,
            pressDepth,
            noteLabelWhiteColor,
            noteLabelBlackColor,
            keyLiftOn,
            pressHapticOn,
            releaseHapticOn,
            hapticsStrength,
        ]
    );

    return (
        <View
            style={[styles.controlledPiano, style]}
            onTouchStart={() => setIsTouchDown(true)}
            onTouchEnd={() => setIsTouchDown(false)}
            onTouchCancel={() => {
                // End touch state and emit note-offs for any remaining active notes
                setIsTouchDown(false);
                if (!disabled) {
                    activeNotes.forEach((n) => onNoteOff(n, activeNotes));
                }
            }}
            // Responder handlers increase robustness across gesture libraries on mobile.
            onStartShouldSetResponder={() => true}
            onResponderGrant={() => setIsTouchDown(true)}
            onResponderRelease={() => setIsTouchDown(false)}
            onResponderTerminate={() => {
                setIsTouchDown(false);
                if (!disabled) {
                    activeNotes.forEach((n) => onNoteOff(n, activeNotes));
                }
            }}
        >
            <Keyboard {...keyboardProps} style={styles.keyboardWrapper} />
        </View>
    );
}
export default React.memo(ControlledPiano);
