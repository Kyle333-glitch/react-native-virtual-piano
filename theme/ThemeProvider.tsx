import { useEffect, useState } from "react";
import { Appearance } from "react-native";

export function colorScheme() {
    return Appearance.getColorScheme(); // "light", "dark", or null
}

export function isLightMode() {
    return Appearance.getColorScheme() !== "dark"; // if color scheme is null, defaults to light
}

export function isDarkMode() {
    return Appearance.getColorScheme() === "dark"; // if color scheme is null, defaults to light
}

export function isNullColorScheme() {
    return Appearance.getColorScheme() === null;
}

export function useColorScheme() {
    const [scheme, setScheme] = useState(Appearance.getColorScheme);

    useEffect(() => {
        const subscription = Appearance.addChangeListener(({ colorScheme }) => {
            setScheme(colorScheme);
        });
        return () => subscription.remove();
    }, []);

    return scheme; // "light", "dark", or null
}