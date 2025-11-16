// © 2025 KYLE QUACH. ALL RIGHTS RESERVED.
// UNAUTHORIZED COPYING, DISTRIBUTION, MODIFICATION, OR USE OF THIS CODE, IN PART OR IN WHOLE, WITHOUT EXPRESS WRITTEN PERMISSION IS STRICTLY PROHIBITED.

import { useState } from "react";
import { ScrollView, View, Text, Pressable, StyleSheet } from "react-native";

import NativeIcon from "../components/NativeIcons";

const faqData = [
    { id: 1, q: "How do I start playing notes?", a: "Simply tap the keys on the piano interface. Each key responds instantly to your touch, producing its corresponding note."},
    { id: 2, q: "How can I customize the appearance of the piano?", a: "Tap the menu icon in the top right corner and select Appearance. You can personalize the look by changing key colors, pressed-key highlights, note labels, key height, animations, borders, and more."},
    { id: 3, q: "How can I customize the behavior of the piano?", a: "Tap the menu icon in the top right corner and select Settings. You can customize press and release haptics, haptic strength, and more."},
    { id: 4, q: "Does the app work offline?", a: "Yes. Once installed, you can play and use all features without an internet connection. Online access is only needed for updates."},
    { id: 5, q: "Can I use headphones or external speakers?", a: "Yes. You can connect headphones, Bluetooth earbuds, or external speakers for private practice or louder playback."},
    { id: 6, q: "Can I mute the piano?", a: "Use your device's volume buttons to quickly mute the piano."},
    { id: 7, q: "How do I adjust volume?", a: "Use your device's volume buttons to quickly lower or raise the piano's sound."},
    { id: 8, q: "How do I update the app to the latest version?", a: "Open the Google Play Store, search for the app, and tap Update if available. If no update appears, you're already on the latest version."},
    { id: 9, q: "How do I reduce audio latency?", a: "Audio delay depends on your device's hardware and settings, but you can minimize it by closing apps running in the background, turning off battery saver mode, keeping your device updated to the latest OS version, and avoid Bluetooth."},
    { id: 10, q: "How do I reset the app to default settings?", a: "Tap the menu icon in the top right corner, go to Settings, and select Reset all to default."},
    { id: 11, q: "How do I reset the piano's appearance to default?", a: "Tap the menu icon in the top right corner, go to Appearance, and select Reset all to default."},
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
                                name={isActive ? "collapse" : "expand"}
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