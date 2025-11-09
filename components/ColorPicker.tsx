import ReanimatedColorPicker, {
    HueSlider,
    Panel1,
} from "reanimated-color-picker";
import { StyleSheet, Platform, ViewStyle, Pressable, Text } from "react-native";

type ColorPickerProps = {
    defaultColor: string;
    onComplete: ({ hex }: { hex: string }) => void;
    onChange?: ({ hex }: { hex: string }) => void;
    thumbShape?: "circle" | "rect";
    thumbSize?: number;
    thumbColor?: string;
    style?: ViewStyle;
};

export default function ColorPicker({
    defaultColor,
    onComplete,
    onChange,
    thumbShape = "circle",
    thumbSize = 24,
    thumbColor = "#808080",
    style,
}: ColorPickerProps) {
    return (
        <ReanimatedColorPicker
            onComplete={onComplete}
            onChange={onChange}
            value={defaultColor}
            thumbShape={thumbShape}
            thumbSize={thumbSize}
            thumbColor={thumbColor}
            style={style}
        >
            <Panel1
                thumbStyle={styles.thumb}
            />
            <HueSlider/>
            <Pressable
            style={styles.resetButton}
            >
                <Text>Reset to default</Text>
            </Pressable>
        </ReanimatedColorPicker>
    );
}

const styles = StyleSheet.create({
    swatches: {
        borderRadius: Platform.select({
            ios: 12,
            android: 10,
            macos: 6,
            windows: 4,
            web: 4,
            default: 4,
        }),
    },
    thumb: {
        borderColor: "#36454F",
    },
    resetButton: {
        padding: 6,
        marginVertical: 8,
        borderRadius: Platform.select({
            ios: 12,
            android: 10,
            macos: 6,
            windows: 4,
            web: 4,
            default: 4,
        }),
        backgroundColor: "#555555",
        borderColor: "#666666",
        alignItems: "center",
        justifyContent: "center",
    },
    resetButtonText: {
        fontSize: 16,
        fontWeight: 500,
        textAlign: "center",
    },
});