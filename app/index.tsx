import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context"

import { Piano, MidiNumbers } from "../lib/react-piano";

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
        noteRange={{
          first: MidiNumbers.fromNote('c4'),
          last: MidiNumbers.fromNote('c5'),
        }}
        onNoteOn={(midi, ctx) => console.log('Note on:', midi, ctx)}
        onNoteOff={(midi, ctx) => console.log('Note off:', midi, ctx)}
      />
    </SafeAreaView>
  );
}
