import { Platform, StyleSheet, Text, TextInput, View } from "react-native";

import showToast from "../helpers/Toast";
import Pressable from "./Pressable";

type Props = {
    value: number;
    onChange: (val: number) => void;
    minValue?: number;
    maxValue?: number;
    step?: number;
    textColor?: string;
    rounded?: boolean;
    height?: number;
};

export default function Stepper({
    value,
    onChange,
    minValue = 0,
    maxValue = 100,
    step = 1,
    textColor = "black",
    rounded = Platform.OS === "ios" ? true : false,
    height = 40,
}: Props) {
    /*
    if (Platform.OS === "ios" || Platform.OS === "android") {
        return (
            <NumericInput
                value={value}
                onChange={onChange}
                minValue={minValue}
                maxValue={maxValue}
                step={step}
                textColor={textColor}
                rounded={rounded}
            />
        );
    }
    FIXME: Add a native stepper for ios and andriod.*/

    return (
        <View style={styles.container}>
            <Pressable
                onPress={() => onChange(Math.max(minValue, value - step))}
                style={[styles.button, styles.leftButton, { height }]}
                accessibilityLabel="Decrease value"
            >
                <Text style={styles.buttonText}>-</Text>
            </Pressable>
            <TextInput
                style={[styles.input, { color: textColor, height }]}
                keyboardType="numeric"
                value={String(value)}
                onChangeText={(t) => {
                    if (t === "") {
                        return;
                    }
                    const num = Number(t);
                    if (!isNaN(num)) {
                        onChange(num);
                    }
                }}
                onBlur={() => {
                    const num = Number(value);
                    if (isNaN(num) || value === null || value === undefined) {
                        onChange(minValue);
                    } else {
                        if (num < minValue) {
                            onChange(minValue);
                            showToast({
                                message: `Minimum value is ${minValue}`,
                                type: "error",
                            });
                        } else if (num > maxValue) {
                            onChange(maxValue);
                            showToast({
                                message: `Maximum value is ${maxValue}`,
                                type: "error",
                            });
                        } else onChange(num);
                    }
                }}
                accessibilityLabel="Numeric value input"
                accessibilityRole="adjustable"
            />
            <Pressable
                onPress={() => onChange(Math.min(maxValue, value + step))}
                style={[styles.button, styles.rightButton, { height }]}
                accessibilityLabel="Increase value"
            >
                <Text style={styles.buttonText}>+</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
    },
    input: {
        width: 60,
        textAlign: "center",
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderColor: "#ccc",
        borderLeftWidth: 1,
        borderRightWidth: 1,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
    },
    button: {
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: "#ccc",
        backgroundColor: "#f2f2f2",
        justifyContent: "center",
        alignItems: "center",
    },
    leftButton: {
        borderTopLeftRadius: 4,
        borderBottomLeftRadius: 4,
        borderRightWidth: 0,
    },
    rightButton: {
        borderTopRightRadius: 4,
        borderBottomRightRadius: 4,
        borderLeftWidth: 0,
    },
});
