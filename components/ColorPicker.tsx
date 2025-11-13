import ReanimatedColorPicker, {
    HueSlider,
    Panel1,
} from "reanimated-color-picker";
import { StyleSheet, Platform, ViewStyle, Text } from "react-native";

import Pressable from "../components/Pressable";
import borderRadius from "../theme/BorderRadius";

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
                onPress={() => {
                    onComplete({ hex: defaultColor });
                    onChange?.({ hex: defaultColor });
                }}
                style={styles.resetButton}
            >
                <Text>Reset to default</Text>
            </Pressable>
        </ReanimatedColorPicker>
    );
}

const styles = StyleSheet.create({
    thumb: {
        borderColor: "#36454F",
    },
    resetButton: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: borderRadius("button"),
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