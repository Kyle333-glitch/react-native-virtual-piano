import { StyleSheet, ViewStyle } from "react-native";

type PianoStyleProps = {
    whiteKeyColor: string;
    blackKeyColor: string;
    borderWidth: number;
    borderColor: string;
    pressedColor: string;
};

export default function getStyles({
    whiteKeyColor,
    blackKeyColor,
    borderWidth,
    borderColor,
    pressedColor,
}: PianoStyleProps) {
    return StyleSheet.create({
    keyboard: {
        position: "relative",
        flexDirection: "row",
    },

    key: {
        flexDirection: "row",
    },

    keyAccidental: {
        backgroundColor: blackKeyColor,
        borderWidth: borderWidth,
        borderColor: borderColor,
        borderTopWidth: 0, // transparent border-top
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
        height: "66%",
        zIndex: 1,
        position: "absolute",
        top: 0,
    },

    keyNatural: {
        backgroundColor: whiteKeyColor,
        // Use a full 1px border for natural keys, but slightly overlap
        // adjacent keys (negative margin) so seams visually remain 1px
        // instead of looking doubled.
        borderLeftWidth: borderWidth,
        borderTopWidth: borderWidth,
        borderBottomWidth: borderWidth,
        borderColor: borderColor,
        borderBottomLeftRadius: 6,
        borderBottomRightRadius: 6,
        flex: 1,
        // Overlap neighbors by 1px to avoid double-thick seams.
        marginRight: -1,
        zIndex: 0,
    },

    keyActive: {
        backgroundColor: pressedColor,
    },

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
        color: "#f8e8d5",
        marginBottom: 3,
    },

    noteLabelNatural: {
        color: "#888",
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
        // Rounded corners and clip any accidental keys that overflow so the
        // keyboard has a clean outer edge.
        borderRadius: 8,
        overflow: "hidden",
        backgroundColor: whiteKeyColor,
    },

    mainHeader: {
        fontSize: 24,
        fontWeight: "bold",
        marginVertical: 12,
    },

    sectionHeader: {
        fontSize: 18,
        fontWeight: "600",
        marginTop: 12,
        marginBottom: 6,
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
}

export const DEFAULTS = {
    ACCIDENTAL_WIDTH_RATIO: 0.65,
    WHITE_KEY_COLOR: "#f6f5f3",
    BLACK_KEY_COLOR: "#555",
    BORDER_WIDTH: 1,
    BORDER_COLOR: "#888",
    PRESSED_COLOR: "#3ac8da",
};

export function keyLayout(left: number | string, width: number | string) {
    return { left, width } as any;
}

export const keyBase = {
    position: "absolute" as const,
    top: 0,
    bottom: 0,
};

export const labelContainer: ViewStyle = {
    flex: 1,
    alignSelf: "flex-end",
};
