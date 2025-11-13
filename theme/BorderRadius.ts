import { Platform } from "react-native";

type ComponentType =
    | "button"
    | "card"
    | "input"
    | "bar"
    | "popup"
    | "toast"
    | "rectangle"
    | "square"
    | "chip"
    | "default";

export default function borderRadius(componentType: ComponentType = "default") {
    switch (componentType) {
        case "button":
            return Platform.select({
                ios: 8,
                android: 4,
                macos: 8,
                windows: 4,
                web: 4,
                default: 4,
            });

        case "card":
            return Platform.select({
                ios: 12,
                android: 8,
                macos: 12,
                windows: 8,
                web: 8,
                default: 8,
            });

        case "input":
            return Platform.select({
                ios: 8,
                android: 4,
                macos: 6,
                windows: 4,
                web: 4,
                default: 4,
            });

        case "bar":
            return Platform.select({
                ios: 2,
                android: 2,
                macos: 2,
                windows: 2,
                web: 2,
                default: 2,
            });

        case "popup":
            return Platform.select({
                ios: 12,
                android: 8,
                macos: 12,
                windows: 8,
                web: 8,
                default: 8,
            });

        case "toast":
            return Platform.select({
                ios: 8,
                android: 4,
                macos: 8,
                windows: 4,
                web: 4,
                default: 4,
            });

        case "rectangle":
            return Platform.select({
                ios: 6,       // rounded rectangle
                android: 6,
                macos: 6,
                windows: 6,
                web: 6,
                default: 6,
            });

        case "square":
            return Platform.select({
                ios: 6,  
                android: 6,
                macos: 6,
                windows: 6,
                web: 6,
                default: 6,
            });

        case "chip":
            return Platform.select({
                ios: 16,
                android: 16,
                macos: 16,
                windows: 16,
                web: 16,
                default: 16,
            });

        case "default":
        default:
            return Platform.select({
                ios: 4,
                android: 4,
                macos: 4,
                windows: 4,
                web: 4,
                default: 4,
            });
    }
}