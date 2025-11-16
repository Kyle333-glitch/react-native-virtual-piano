import * as Haptics from "expo-haptics";
import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import { View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

import type { StyleProp, ViewStyle } from "react-native";
import type { GestureTouchEvent } from "react-native-gesture-handler";

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
    const [activeTouches, setActiveTouches] = useState<Set<number>>(new Set());
    const activeTouchesRef = useRef<Set<number>>(new Set());

    const isPressed = activeTouches.size > 0;

    const [keyBounds, setKeyBounds] = useState({
        x: 0,
        y: 0,
        width: 0,
        height: 0,
    });

    const keyRef = useRef<View>(null);

    useEffect(() => {
        if (disabled) {
            setActiveTouches(new Set());
            handleNoteOff();
        }
    }, [disabled]);

    useEffect(() => {
        return () => {
            setActiveTouches(new Set());
            handleNoteOff();
        };
    }, []);

    const isFingerInsideKey = (touchX: number, touchY: number) => {
        const { x, y, width, height } = keyBounds;
        return (
            touchX >= x &&
            touchX <= x + width &&
            touchY >= y &&
            touchY <= y + height
        );
    };

    const updateKeyBounds = () => {
        if (keyRef.current) {
            keyRef.current.measureInWindow((x, y, width, height) => {
                setKeyBounds({ x, y, width, height });
            });
        }
    };

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

    const panGesture = Gesture.Pan()
        .enabled(!disabled)
        .minPointers(1)
        .onTouchesDown((event: GestureTouchEvent) => {
            if (activeTouches.size === 0) {
                const touches = activeTouchesRef.current;
                event.changedTouches.forEach((t) => touches.add(t.id));
                activeTouchesRef.current = touches;
                setActiveTouches(touches);
                handleNoteOn();
            }
        })
        .onTouchesMove((event: GestureTouchEvent) => {
            if (!gliss) return;

            const touches = activeTouchesRef.current;

            event.changedTouches.forEach((t) => {
                const { x, y } = t;
                const inKey = isFingerInsideKey(x, y);
                const alreadyPressed = touches.has(t.id);

                if (inKey && !alreadyPressed) {
                    touches.add(t.id);
                    if (touches.size === 1) handleNoteOn();
                } else if (!inKey && alreadyPressed) {
                    touches.delete(t.id);
                    if (touches.size === 0) handleNoteOff();
                }
            });

            activeTouchesRef.current = touches;

            if (touches.size !== activeTouches.size)
                setActiveTouches(new Set(touches));
        })
        .onTouchesUp((event: GestureTouchEvent) => {
            const touches = activeTouchesRef.current;
            event.changedTouches.forEach((t) => touches.delete(t.id));
            setActiveTouches(touches);
            if (touches.size === 0) handleNoteOff();
        })
        .onFinalize(() => {
            // avoids stuck notes for glissando
            setActiveTouches(new Set());
            handleNoteOff();
        });

    const innerBg = disabled
        ? disabledKeyColor
        : isPressed || active
        ? pressedColor
        : accidental
        ? blackKeyColor
        : whiteKeyColor;

    const desiredInnerHeight = accidental
        ? blackKeyHeight ?? DEFAULTS.BLACK_KEY_HEIGHT
        : undefined;

    const innerStyles: StyleProp<ViewStyle> = [
        accidental
            ? {
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: desiredInnerHeight,
                  backgroundColor: innerBg,
                  borderRadius: 1,
                  margin: 0,
              }
            : {
                  ...styles.keyInner,
                  margin: 0,
                  backgroundColor: innerBg,
              },
    ];

    const outerStyles: StyleProp<ViewStyle> = [
        accidental
            ? ({
                  position: "absolute",
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
    ];

    return (
        <GestureDetector gesture={panGesture}>
            <View
                style={outerStyles}
                onLayout={updateKeyBounds}
                ref={keyRef}
                accessibilityRole="button"
                accessibilityLabel={attrs.note}
                accessibilityState={{
                    selected: !!active,
                    disabled: !!disabled,
                }}
                accessibilityHint="Piano key"
            >
                <View style={innerStyles}>
                    <View style={labelContainer}>
                        {renderNoteLabel &&
                            renderNoteLabel({
                                midiNumber,
                                isActive: false, // note always renders, pressed or not FIXME
                                isAccidental: accidental,
                            })}
                    </View>
                </View>
            </View>
        </GestureDetector>
    );
}

export default React.memo(Key);
//TODO: when implement scroll view:   onScroll={throttle(() => {
//    updateKeyBounds(); // measure keys again
// }, 16)}
//  scrollEventThrottle={} based on screen refresh rate
