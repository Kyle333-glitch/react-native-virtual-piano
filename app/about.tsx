import { Text, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function About() {
    return(
        <SafeAreaView>
            <Text>React Native Piano</Text>
            <Text>Description</Text>
            <Text>Rate on App Store / Play Store</Text>
            <Text>Developer Info</Text>
            <Text>Contact Info</Text>
            <Text>Legal Links</Text>
            <Text>Version Number</Text>
        </SafeAreaView>
    );
}