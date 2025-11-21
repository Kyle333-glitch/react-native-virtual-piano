import { Platform } from "react-native";

import { ANDROID_API_MAP, WINDOWS_API_CONTRACT_MAP, MACOS_VERSION_MAP } from "./api-maps";
import { getDetailedPlatformOS } from "./platform-os";

export const getBrand = () => {
    switch (Platform.OS) {
        case "ios":
            return "Apple";
        case "macos":
            return "Apple";
        case "android":
            return "Android";
        case "windows":
            return "Microsoft";
        case "web":
            return "Web";
        default:
            return "Unknown";
    }
};

export const isApple = Platform.OS === "ios" || Platform.OS === "macos";

export const getMarketingVersionName = () => {
    if (Platform.OS === "android")
        return ANDROID_API_MAP[Platform.Version] ?? undefined;
    if (Platform.OS === "windows")
        return WINDOWS_API_CONTRACT_MAP[Platform.Version]?.release ?? undefined;
    if (Platform.OS === "ios" || Platform.OS === "macos")
        return parseInt(Platform.Version, 10);
    return undefined;
};

export const getWindowsFamily = () => Platform.OS === "windows" 
    ? WINDOWS_API_CONTRACT_MAP[Platform.Version]?.family
    : undefined;

export const getMacOSMarketingName = () => 
    Platform.OS === "macos" ? MACOS_VERSION_MAP[parseInt(Platform.Version, 10)] : undefined;


export const PLATFORM_DISPLAY_NAMES: Record<string, string> = {
    ios: "iOS",
    ipados: "iPadOS",
    macos: "macOS",
    android: "Android",
    windows: "Windows",
    web: "Web",
    "android-tv": "Android TV",
    tvos: "Apple TV",
    visionos: "visionOS",
};

export const getPlatformDisplayName = () =>
    PLATFORM_DISPLAY_NAMES[getDetailedPlatformOS()] ?? "Unknown";

export const INFERRED_DEVICE_NAMES: Record<string, string> = {
    ios: "iPhone",
    ipados: "iPad",
    macos: "Mac",
    android: "Android Mobile",
    windows: "Windows PC",
    web: "Web Browser",
    "android-tv": "Android TV",
    tvos: "Apple TV",
    visionos: "Apple Vision Pro",
};
export const getInferredDeviceName = () =>
    INFERRED_DEVICE_NAMES[getDetailedPlatformOS()] ?? "Unknown";
