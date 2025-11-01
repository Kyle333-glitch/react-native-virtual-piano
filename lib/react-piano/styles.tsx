import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    keyboard: {
        position: "relative",
        flexDirection: "row",
    },

    key: {
        flexDirection: "row",
    },

    keyAccidental: {
        backgroundColor: "#555",
        borderWidth: 1,
        // Use a dark border color for accidentals so their edges blend with
        // the black key color instead of showing a white seam against the
        // keyboard wrapper's rounded background when clipped.
        borderColor: "#444",
        borderTopWidth: 0, // transparent border-top
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
        height: "66%",
        zIndex: 1,
        position: "absolute",
        top: 0,
    },

    keyNatural: {
        backgroundColor: "#f6f5f3",
        // Use a full 1px border for natural keys, but slightly overlap
        // adjacent keys (negative margin) so seams visually remain 1px
        // instead of looking doubled.
        borderLeftWidth: 1,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: "#888",
        borderBottomLeftRadius: 6,
        borderBottomRightRadius: 6,
        flex: 1,
        // Overlap neighbors by 1px to avoid double-thick seams.
        marginRight: -1,
        zIndex: 0,
    },

    keyActive: {
        backgroundColor: "#3ac8da",
    },

    keyActiveAccidental: {
        borderWidth: 1,
        borderColor: "#fff",
        borderTopWidth: 1,
        borderTopColor: "#3ac8da",
        height: "65%",
    },

    keyActiveNatural: {
        borderWidth: 1,
        borderColor: "#3ac8da",
        height: "98%",
    },

    keyDisabledAccidental: {
        backgroundColor: "#ddd",
        borderWidth: 1,
        borderColor: "#999",
    },

    keyDisabledNatural: {
        backgroundColor: "#eee",
        borderWidth: 1,
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
        backgroundColor: "#f6f5f3",
    },
});

// Exported constants and helpers for layout and defaults. Dynamic per-key
// layout values still need to be provided at render time, but this helper
// centralizes the shape and intent in one file.
export const DEFAULTS = {
    ACCIDENTAL_WIDTH_RATIO: 0.65,
};

export function keyLayout(left: number | string, width: number | string) {
    // Return a style object. Using `any` here avoids strict type mismatch in
    // callers where width/left may be expressed as percent strings.
    return { left, width } as any;
}

// Base key positioning used by individual key components.
export const keyBase = {
    position: "absolute" as const,
    top: 0,
    bottom: 0,
};

// For backward compatibility with previous local styles
export const labelContainer = styles.noteLabelContainer;

export default styles;
