// © 2025 KYLE QUACH. ALL RIGHTS RESERVED.
// UNAUTHORIZED COPYING, DISTRIBUTION, MODIFICATION, OR USE OF THIS CODE, IN PART OR IN WHOLE, WITHOUT EXPRESS WRITTEN PERMISSION IS STRICTLY PROHIBITED.

import { Drawer } from "expo-router/drawer";
import NativeIcon from "../components/NativeIcons";
import { Toasts } from "@backpackapp-io/react-native-toast";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return(
    <GestureHandlerRootView style={{ flex: 1 }}>
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
          headerStyle: { backgroundColor: "blue"},
          headerTintColor: "black",
        }}
      >
        <Drawer.Screen
          name="index"
          options={{
            drawerLabel: "Piano",
            title: "Piano",
            drawerIcon: ({ color, size }) => (
              <NativeIcon name="music-note" color={color} size={size}/> //FIXME: change to piano
            ),
          }}
        />

        <Drawer.Screen
          name="Appearance"
          options={{
            drawerLabel: "Appearance",
            title: "Appearance Preferences",
            drawerIcon: ({ color, size }) => (
              <NativeIcon name="palette" color={color} size={size}/>
            ),
          }}
        />

        <Drawer.Screen
          name="Settings"
          options={{
            drawerLabel: "Settings",
            title: "Behavior Settings",
            drawerIcon: ({ color, size }) => (
              <NativeIcon name="settings" color={color} size={size}/>
            ),
          }}
        />

        <Drawer.Screen
          name="Faqs"
          options={{
            drawerLabel: "FAQs",
            title: "FAQs",
            drawerIcon: ({ color, size }) => (
              <NativeIcon name="help" color={color} size={size}/>
            ),
          }}
        />

        <Drawer.Screen
          name="About"
          options={{
            drawerLabel: "About",
            title: "About",
            drawerIcon: ({ color, size }) => (
              <NativeIcon name="info" color={color} size={size}/>
            ),
          }}
        />
      </Drawer>

      <Toasts/>
    </GestureHandlerRootView>
  );
}
