// © 2025 KYLE QUACH. ALL RIGHTS RESERVED.
// UNAUTHORIZED COPYING, DISTRIBUTION, MODIFICATION, OR USE OF THIS CODE, IN PART OR IN WHOLE, WITHOUT EXPRESS WRITTEN PERMISSION IS STRICTLY PROHIBITED.

import { Text, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function About() {
    return(
        <SafeAreaView style={{ padding: 16 }}>
            <Text style={styles.header1}>About This App</Text>
            <Text style={styles.body}>This piano app is designed to be simple, responsive, and easy to use. Whether you're practicing scales, learning note positions, or just exploring sounds, the interface gives you a clean, distraction-free way to play.</Text>
            
            <Text style={styles.header2}>- Lightweight design:</Text>
            <Text style={styles.body}>No clutter, just the essentials you need to start playing right away.</Text>
            
            <Text style={styles.header2}>- Customizable look and feel:</Text>
            <Text style={styles.body}>Adjust colors, labels, and heights to make the piano yours.</Text>
            
            <Text style={styles.header2}>- Accessible anywhere:</Text>
            <Text style={styles.body}>Works offline, so you can practice anytime.</Text>
            
            <Text style={styles.header2}>- Device-friendly audio:</Text>
            <Text style={styles.body}>Play through your speakers, headphones, or Bluetooth devices.</Text>
            
            <Text style={styles.header2}>- Reset anytime:</Text>
            <Text style={styles.body}>Quickly return to default settings and preferences for a fresh start.</Text>
        </SafeAreaView>
    );
}
//TODO: add dev info, contact info, about me, legal links, version number, rate on app store / play store
const styles = StyleSheet.create({
    header1: {
        fontSize: 28,
        fontWeight: "bold",
        textAlign: "center",
        marginVertical: 16,
        color: "#000",
    },
    header2: {
        fontSize: 18,
        fontWeight: "600",
        textAlign: "left",
        marginVertical: 12,
        color: "#333"
    },
    body: {
        fontSize: 16,
        marginBottom: 8,
    },
});