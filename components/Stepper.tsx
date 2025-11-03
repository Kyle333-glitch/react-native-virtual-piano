import NumericInput from "react-native-numeric-input";
import { Platform, View, TextInput, Pressable, Text, StyleSheet } from "react-native";

type Props = {
    value: number;
    onChange: (val: number) => void;
    minValue?: number;
    maxValue?: number;
    step?: number;
    textColor?: string;
    rounded?: boolean;
};

export default function Stepper({
    value,
    onChange,
    minValue = 0,
    maxValue = 100,
    step = 1,
    textColor = "black",
    rounded = Platform.OS === "ios" ? true : false
}: Props) {
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

    return (
        <View style={styles.container}>
            <Pressable 
                onPress={() => onChange(Math.max(minValue, value - step))} 
                style={styles.button}
                accessibilityLabel="Decrease value"
                accessibilityRole="button"
            >
                <Text style={styles.buttonText}>-</Text>
            </Pressable>
            <TextInput
                style={[styles.input, { color: textColor }]}
                keyboardType="numeric"
                value={String(value)}
                onChangeText={(t) => {
                    const num = parseFloat(t);
                    if (!isNaN(num)) {
                        onChange(Math.min(maxValue, Math.max(minValue, num)));
                    }
                }}
                accessibilityLabel="Numeric value input"
                accessibilityRole="adjustable"
            />
            <Pressable 
                onPress={() => onChange(Math.min(maxValue, value + step))}
                style={styles.button}
                accessibilityLabel="Increase value"
                accessibilityRole="button"
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
        gap: 8,
    },
    input: {
        width: 60,
        textAlign: "center",
        borderWidth: 1,
        borderColor: "#ccc",
        marginHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
    },
    button: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 4,
        backgroundColor: "#f2f2f2"
    },
});