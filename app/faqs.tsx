import { useState } from "react";
import { ScrollView, View, Text, Pressable, StyleSheet } from "react-native";

import NativeIcon from "../components/NativeIcons";

const faqData = [
    { id: 1, q: "Question 1", a: "Answer 1"},
    { id: 2, q: "Question 2", a: "Answer 2"},
    { id: 3, q: "Question 3", a: "Answer 3"},
    { id: 4, q: "Question 4", a: "Answer 4"},
    { id: 5, q: "Question 5", a: "Answer 5"},
];

export default function FAQs() {
    const [activeId, setActiveId] = useState<number | null>(null);

    const toggle = (id: number) => {
        setActiveId(activeId === id ? null : id);
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Frequently Asked Questions</Text>
            {faqData.map((item, index) => {
                const isActive = activeId === item.id;

                return(
                    <View key={item.id} style={styles.qaBlock}>
                        <Pressable style={styles.qRow} onPress={() => toggle(item.id)}>
                            <Text style={[styles.q, isActive && styles.qActive]}>{item.q}</Text>
                            <NativeIcon
                                name={isActive ? "chevron_up" : "chevron_down"}
                                color={isActive ? "blue" : "#555"}
                            />
                        </Pressable>
                        {isActive && <Text style={styles.a}>{item.a}</Text>}
                    </View>
                );
            })}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    qaBlock: {
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
        paddingBottom: 10,
    },
    qRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 8,
    },
    q: {
        fontSize: 18,
        fontWeight: "500",
        color: "#333",
    },
    qActive: {
        fontWeight: "bold",
        color: "blue",
    },
    a: {
        fontSize: 16,
        color: "#555",
        marginTop: 8,
        lineHeight: 22,
    },
});