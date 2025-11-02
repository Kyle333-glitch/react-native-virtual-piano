import { Text, View, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context"
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { Piano, MidiNumbers } from "../lib/react-piano";

import NativeIcon from "../components/NativeIcons";

export default function Index() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Piano
        noteRange={["c4", "c5"]}
        onNoteOn={(midi, ctx) => console.log('Note on:', midi, ctx)}
        onNoteOff={(midi, ctx) => console.log('Note off:', midi, ctx)}
      />
      <Link href="/settings" asChild>
        <Pressable style={{ position: "absolute", top: 16, right: 16 }}>
          <NativeIcon name="settings"/>
        </Pressable>
      </Link>
    </SafeAreaView>
  );
}
