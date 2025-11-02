import { Drawer } from "expo-router/drawer";
import NativeIcon from "../components/NativeIcons"

export default function RootLayout() {
  return(
    <Drawer
      screenOptions={{
        drawerStyle: {
          backgroundColor: "blue",
          width: 240,
          height: "100%",
        },
        drawerPosition: "right",
        drawerType: "front",
        drawerActiveTintColor: "white",
        drawerInactiveTintColor: "#ccc",
        headerStyle: { backgroundColor: "#fff"},
        headerTintColor: "black",
      }}
    >
      <Drawer.Screen
        name="index"
        options={{
          drawerLabel: "Piano",
          title: "Piano",
          drawerIcon: ({ color, size }) => (
            <NativeIcon name="piano" color={color} size={size}/>
          ),
        }}
      />
      <Drawer.Screen
        name="settings"
        options={{
          drawerLabel: "Settings",
          title: "Settings",
          drawerIcon: ({ color, size }) => (
            <NativeIcon name="settings" color={color} size={size}/>
          ),
        }}
      />
      <Drawer.Screen
        name="appearance"
        options={{
          drawerLabel: "Appearance",
          title: "Appearance",
          drawerIcon: ({ color, size }) => (
            <NativeIcon name="palette" color={color} size={size}/>
          ),
        }}
      />
    </Drawer>
  );
}
