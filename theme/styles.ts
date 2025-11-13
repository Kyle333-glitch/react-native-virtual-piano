import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    header: {
        height: 64,
        paddingHorizontal: 16,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#e0e0e0",
    },

    container: {
        flex: 1,
        padding: 16,
    },

    title: {
        fontSize: 24,
        fontWeight: "600",
        color: "#111",
    },

    subtitle: {
        fontSize: 18,
        fontWeight: "500",
        color: "#333",
    },

    body: {
        fontSize: 14,
        color: "#444",
        lineHeight: 20,
    },

    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 12,
        backgroundColor: "#fff",
    },
});