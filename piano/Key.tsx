import * as Haptics from "expo-haptics";
import React, { useCallback, useMemo } from "react";
import { Pressable, StyleProp, View, ViewStyle } from "react-native";

import MidiNumbers from "./midiNumbers";
import { HapticsStrength } from "./Piano";
import getStyles, { DEFAULTS, keyLayout, labelContainer } from "./styles";

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
                noteLabelWhiteColor,
                noteLabelBlackColor,
            }),
        [whiteKeyColor, blackKeyColor, borderWidth, borderColor, pressedColor]
    );

    const handleNoteOn = useCallback(() => {
        if (!disabled) {
            onNoteOn(midiNumber);
            if (pressHapticOn) {
                const hapticsStyle =
                    hapticsStrength === "Heavy"
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
        left = Math.round(relativePosition * keyWidthPx);
        width = Math.round(
            (accidental ? accidentalWidthRatio : 1) * keyWidthPx
        );
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
            onPressIn={handleNoteOn}
            onPressOut={handleNoteOff}
            disabled={disabled}
            style={[
                // For natural keys: use keyLayout (top:0, bottom:0) to fill container.
                // For accidental keys: use explicit left/width with top:0 and explicit height.
                accidental
                    ? ({
                          position: "absolute" as const,
                          left,
                          width,
                          top: 0,
                      } as ViewStyle)
                    : keyLayout(left, width),
                styles.key,
                accidental ? styles.keyAccidental : styles.keyNatural,
                accidental
                    ? { height: blackKeyHeight ?? DEFAULTS.BLACK_KEY_HEIGHT }
                    : {},
                style,
            ]}
        >
            {({ pressed }) => {
                const innerBg = disabled
                    ? disabledKeyColor
                    : pressed || active
                    ? pressedColor
                    : accidental
                    ? blackKeyColor
                    : whiteKeyColor;

                const desiredInnerHeight = accidental
                    ? blackKeyHeight ?? DEFAULTS.BLACK_KEY_HEIGHT
                    : undefined;

                // Build inner face styles. For natural keys we keep the
                // existing `styles.keyInner` which fills the outer box. For
                // accidentals we must NOT include `bottom: 0` (present in
                // `styles.keyInner`) because that forces the inner face to
                // stretch; instead create an absolute inner face with the
                // explicit `height` we were passed.
                const innerStyles: any[] = [];

                if (accidental) {
                    innerStyles.push({
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: desiredInnerHeight,
                        backgroundColor: innerBg,
                        borderRadius: 1,
                    } as ViewStyle);
                } else {
                    innerStyles.push(styles.keyInner, {
                        backgroundColor: innerBg,
                    });
                }

                // Preserve the small margin/border adjustments used when
                // pressed vs not pressed. These are safe to apply to both
                // accidental and natural inner faces.
                if (pressed) {
                    innerStyles.push({
                        marginTop: 0,
                        marginBottom: 0,
                        marginLeft: 0,
                        marginRight: 0,
                        borderWidth: 0,
                    });
                } else {
                    innerStyles.push({
                        marginTop: 0,
                        marginBottom: 0,
                        marginLeft: 0,
                        marginRight: 0,
                    });
                }

                return (
                    <View style={innerStyles}>
                        <View style={labelContainer}>
                            {!disabled && renderNoteLabel
                                ? renderNoteLabel({
                                      midiNumber,
                                      isActive: active,
                                      isAccidental: accidental,
                                  })
                                : null}
                        </View>
                    </View>
                );
            }}
        </Pressable>
    );
}

export default React.memo(Key);
