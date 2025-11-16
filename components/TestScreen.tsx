import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, View, Text } from "react-native";
import NativeIcon, { iconNames } from "../components/NativeIcons";

export default function TestScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexDirection: "row", flexWrap: "wrap", padding: 16 }}>
        {iconNames.map((name) => (
          <View key={name} style={{ alignItems: "center", margin: 12 }}>
            {/* Default */}
            <NativeIcon name={name} size={24} color="black" />
            {/* Larger size */}
            <NativeIcon name={name} size={32} color="blue" />
            {/* Outline variant */}
            <NativeIcon name={name} size={28} color="red" outline />
            {/* Label */}
            <Text style={{ fontSize: 12, marginTop: 4 }}>{name}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}