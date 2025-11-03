import React, { useCallback, useMemo } from "react";
import { Pressable, StyleProp, View, ViewStyle } from "react-native";
import * as Haptics from "expo-haptics";

import MidiNumbers from "./MidiNumbers";
import getStyles, { DEFAULTS, keyBase, keyLayout, labelContainer } from "./styles";
import { HapticsStrength } from "./Piano";

type PitchPositions = Record<string, number>;

type KeyProps = {
    midiNumber: number;
    // Pixel width per natural key when the keyboard is given an explicit pixel width.
    keyWidthPx?: number;
    // Fractional width per natural key (1 / naturalKeyCount) used when no pixel
    // container width is provided; Key will convert to percent strings.
    naturalKeyWidthFraction?: number;
    gliss: boolean;
    accidental: boolean;
    active: boolean;
    disabled: boolean;
    onNoteOn: (midiNumber: number) => void;
    onNoteOff: (midiNumber: number) => void;
    accidentalWidthRatio?: number;
    pitchPositions?: PitchPositions;
    noteRange: { first: number; last: number };
    renderNoteLabel?: (args: {
        midiNumber: number;
        isActive: boolean;
        isAccidental: boolean;
    }) => React.ReactNode;
    style?: StyleProp<ViewStyle>;
    whiteKeyColor: string; // Trust that Piano has passed down its defaults
    blackKeyColor: string;
    borderWidth: number;
    borderColor: string;
    pressedColor: string;
    disabledBorderWidth?: number;
    disabledBorderColor?: string;
    disabledKeyColor?: string;
    blackKeyHeight: number;
    whiteKeyHeight: number;
    keyShrinkPercent?: number;
    pressDepth: number;
    noteLabelWhiteColor?: string;
    noteLabelBlackColor?: string;

    keyLiftOn?: boolean;
    pressHapticOn?: boolean;
    releaseHapticOn?: boolean;
    hapticsStrength?: HapticsStrength;
};

const DEFAULT_PITCH_POSITIONS: PitchPositions = {
    C: 0,
    Db: 0.55,
    D: 1,
    Eb: 1.8,
    E: 2,
    F: 3,
    Gb: 3.5,
    G: 4,
    Ab: 4.7,
    A: 5,
    Bb: 5.85,
    B: 6,
};

function Key({
    midiNumber,
    keyWidthPx,
    naturalKeyWidthFraction,
    gliss,
    accidental,
    active,
    disabled,
    onNoteOn,
    onNoteOff,
    accidentalWidthRatio = DEFAULTS.ACCIDENTAL_WIDTH_RATIO,
    pitchPositions = DEFAULT_PITCH_POSITIONS,
    noteRange,
    renderNoteLabel,
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
}: KeyProps) {
    const styles = useMemo(
        () =>
            getStyles({
                whiteKeyColor,
                blackKeyColor,
                borderWidth,
                borderColor,
                pressedColor,
            }),
        [whiteKeyColor, blackKeyColor, borderWidth, borderColor, pressedColor]
    )

    const handleNoteOn = useCallback(() => {
        if (!disabled) {
            onNoteOn(midiNumber);
            if (pressHapticOn) {
                const hapticsStyle = hapticsStrength === "Heavy"
                    ? Haptics.ImpactFeedbackStyle.Heavy
                    : hapticsStrength === "Medium"
                    ? Haptics.ImpactFeedbackStyle.Medium
                    : Haptics.ImpactFeedbackStyle.Light;
                Haptics.impactAsync(hapticsStyle);
            }
        }
    }, [onNoteOn, midiNumber, disabled, pressHapticOn, hapticsStrength]);

    const handleNoteOff = useCallback(() => {
        if (!disabled) {
            onNoteOff(midiNumber);
            if (releaseHapticOn) Haptics.selectionAsync();
        }
    }, [onNoteOff, midiNumber, disabled, releaseHapticOn]);

    const getAbsoluteKeyPosition = (midiNumber: number) => {
        const OCTAVE_WIDTH = 7;
        const { octave, pitchName } = MidiNumbers.getAttributes(midiNumber);
        const pitchPosition = pitchPositions[pitchName];
        const octavePosition = OCTAVE_WIDTH * octave;
        return pitchPosition + octavePosition;
    };

    const getRelativeKeyPosition = (midiNumber: number) =>
        getAbsoluteKeyPosition(midiNumber) -
        getAbsoluteKeyPosition(noteRange.first);

    const relativePosition = getRelativeKeyPosition(midiNumber);

    // Compute layout either in pixels (when `keyWidthPx` provided) or percent strings
    // when only fractional widths are available.
    let left: number | string;
    let width: number | string;

    if (typeof keyWidthPx === "number") {
        left = relativePosition * keyWidthPx;
        width = (accidental ? accidentalWidthRatio : 1) * keyWidthPx;
    } else {
        const frac = naturalKeyWidthFraction ?? 1;
        const leftPct = relativePosition * frac * 100;
        const widthPct = (accidental ? accidentalWidthRatio : 1) * frac * 100;
        left = `${leftPct}%`;
        width = `${widthPct}%`;
    }

    const attrs = MidiNumbers.getAttributes(midiNumber);

    return (
        <Pressable
            accessibilityRole="button"
            accessibilityLabel={attrs.note}
            accessibilityState={{ selected: !!active, disabled: !!disabled }}
            accessibilityHint="Plays the piano note"
            style={({ pressed }) => [
                keyBase,
                accidental ? styles.keyAccidental : styles.keyNatural,
                styles.key,
                (active ?? pressed) && styles.keyActive,
                disabled && {
                    backgroundColor: disabledKeyColor,
                    borderColor: disabledBorderColor,
                    borderWidth: disabledBorderWidth,
                },
                pressed && keyLiftOn && {
                    transform: [
                        { translateY: pressDepth },
                        { scale: 1 - (keyShrinkPercent ?? 0) / 100 },
                    ],
                },
                !accidental && { height: whiteKeyHeight },
                accidental && { height: blackKeyHeight },
                keyLayout(left, width),
                style,
            ]}
            onPressIn={handleNoteOn}
            onPressOut={handleNoteOff}
            disabled={disabled}
        >
            <View style={labelContainer}>
                {!disabled && renderNoteLabel
                    ? renderNoteLabel({
                          midiNumber,
                          isActive: active,
                          isAccidental: accidental,
                      })
                    : null}
            </View>
        </Pressable>
    );

}

export default React.memo(Key);
