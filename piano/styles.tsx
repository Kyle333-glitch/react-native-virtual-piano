import { StyleSheet, ViewStyle } from "react-native";

import { HapticsStrength } from "../piano/Piano";

type PianoStyleProps = {
    whiteKeyColor: string;
    blackKeyColor: string;
    borderWidth: number;
    borderColor: string;
    pressedColor: string;
    noteLabelWhiteColor: string | undefined;
    noteLabelBlackColor: string | undefined;
};

export default function getStyles({
    whiteKeyColor,
    blackKeyColor,
    borderWidth,
    borderColor,
    pressedColor,
    noteLabelWhiteColor,
    noteLabelBlackColor,
}: PianoStyleProps) {
    return StyleSheet.create({
        keyboard: {
            position: "relative",
            flexDirection: "row",
            backgroundColor: whiteKeyColor,
        },

        key: {
            flexDirection: "row",
            overflow: "hidden",
        },

        keyAccidental: {
            backgroundColor: blackKeyColor,
            borderLeftWidth: borderWidth,
            borderRightWidth: borderWidth,
            borderBottomWidth: borderWidth,
            borderTopWidth: 0, // No top border to prevent double border with white keys
            borderColor,
            position: "absolute",
            zIndex: 2,
            marginLeft: -borderWidth, // Compensate for the border width
            marginRight: -borderWidth,
            overflow: "hidden",
        },

        // White (natural) key styling:
        keyNatural: {
            backgroundColor: whiteKeyColor,
            borderLeftWidth: borderWidth,
            borderTopWidth: borderWidth,
            borderBottomWidth: borderWidth,
            borderRightWidth: 0, // No right border to prevent doubles
            borderColor,
            height: "100%",
            zIndex: 0,
            overflow: "hidden",
        },

        // Inner face of a key. This sits inside the bordered outer box and is
        // where we apply pressed/active backgrounds and small height changes
        // to simulate key press without touching borders.
        keyInner: {
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "transparent",
            justifyContent: "flex-end",
            overflow: "hidden",
        },

        keyActive: {
            backgroundColor: pressedColor,
        },

        /*
    keyActiveAccidental: {
        borderWidth: borderWidth,
        borderColor: pressedColor,
        borderTopWidth: borderWidth,
        borderTopColor: pressedColor,
        height: "65%",
    },

    keyActiveNatural: {
        borderWidth: borderWidth,
        borderColor: pressedColor,
        height: "98%",
    },

    keyDisabledAccidental: {
        backgroundColor: "#ddd",
        borderWidth: borderWidth,
        borderColor: "#999",
    },

    keyDisabledNatural: {
        backgroundColor: "#eee",
        borderWidth: borderWidth,
        borderColor: "#aaa",
    },
    */
        noteLabelContainer: {
            flex: 1,
            alignSelf: "flex-end",
        },

        noteLabel: {
            fontSize: 12,
            textAlign: "center",
            textTransform: "capitalize",
            // userSelect not supported in RN
        },

        noteLabelAccidental: {
            color: noteLabelBlackColor,
            marginBottom: 3,
        },

        noteLabelNatural: {
            color: noteLabelWhiteColor,
            marginBottom: 3,
        },

        noteLabelNaturalActive: {
            color: "#f8e8d5",
        },
        // ControlledPiano container: stretch to fill parent horizontally but
        // don't force centering here so the keyboard wrapper can control centering.
        controlledPiano: {
            flex: 1,
            alignItems: "stretch",
            justifyContent: "center",
            alignSelf: "stretch",
        },

        // Wrapper applied to Keyboard. Make it greedy by default so the
        // keyboard fills available horizontal space. Consumers can override
        // with a custom style prop if they want a narrower layout.
        keyboardWrapper: {
            alignSelf: "stretch",
            width: "100%",
            backgroundColor: whiteKeyColor,
            overflow: "hidden",
            // Draw outer top/bottom/right borders so the last white key has a
            // visible right edge (we suppress right borders on inner keys).
            // We keep the left edge to be drawn by the first white key itself
            // to avoid a doubled left seam.
            borderTopWidth: borderWidth,
            borderBottomWidth: borderWidth,
            borderRightWidth: borderWidth,
            borderLeftWidth: 0,
            borderColor: borderColor,
        },

        mainHeader: {
            fontSize: 24,
            fontWeight: "bold",
            marginVertical: 12,
        },
    });
}

export const headerStyles = StyleSheet.create({
    sectionHeader: {
        fontSize: 18,
        fontWeight: "600",
        marginTop: 12,
        marginBottom: 6,
    },

    smallSectionHeader: {
        fontSize: 16,
        lineHeight: 24,
    },

    mediumSectionHeader: {
        fontSize: 16,
        lineHeight: 32,
    },

    underlineHeader: {
        fontSize: 18,
        fontWeight: "bold",
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        paddingBottom: 4,
        marginBottom: 8,
    },
});

export const DEFAULTS = {
    ACCIDENTAL_WIDTH_RATIO: 0.65,
    WHITE_KEY_COLOR: "#f6f5f3",
    BLACK_KEY_COLOR: "#555",
    BORDER_WIDTH: 1,
    BORDER_COLOR: "#888",
    PRESSED_COLOR: "#3ac8da",
    GLISSANDO_ON: false,
    KEY_LIFT_ON: true,
    PRESS_HAPTIC_ON: true,
    RELEASE_HAPTIC_ON: true,
    HAPTICS_STRENGTH: "Medium" as HapticsStrength,
    BORDER_RADIUS: 4,
    DISABLED_BORDER_WIDTH: 1,
    DISABLED_BORDER_COLOR: "#aaa",
    DISABLED_KEY_COLOR: "#808080",
    KEY_LABEL_MODE: "All",
    KEY_SHRINK_PERCENT: 95,
    BLACK_KEY_HEIGHT: 60,
    WHITE_KEY_HEIGHT: 100,
    KEY_COLOR_SUBSET: "All",
    ONLY_C: false,
    WITH_OCTAVE_NUMBERS: false,
    SPECIAL: "Unset",
    NOTE_LABEL_WHITE_COLOR: "#000",
    NOTE_LABEL_BLACK_COLOR: "#fff",
    PRESS_DEPTH: 4, //FIXME: Does press depth do it in pixels / dp or %
    // Fractional height of black keys relative to white key height.
    // Use ~0.67 so black keys are about two-thirds the white key height.
    BLACK_KEY_HEIGHT_RATIO: 0.67,
};

export function keyLayout(
    left: number | string,
    width: number | string
): ViewStyle {
    return {
        position: "absolute",
        left: typeof left === "number" ? left : left,
        width: typeof width === "number" ? width : width,
        top: 0,
        bottom: 0,
    } as ViewStyle;
}

export const keyBase = {};

export const labelContainer: ViewStyle = {
    flex: 1,
    alignSelf: "flex-end",
};
