import { osBuildId as expo_device_osBuildId } from "expo-device";
import { Platform } from "react-native";

import { ANDROID_API_MAP, WINDOWS_API_CONTRACT_MAP } from "./api-maps";

export const osBuildId = expo_device_osBuildId;

export const getPlatformVersion = () => Platform.Version;

export const getMajorPlatformVersion = () => {
    if (Platform.OS === "ios" || Platform.OS === "macos")
        return parseInt(Platform.Version, 10);
    return Platform.Version;
};

export const getAndroidApiLevel = () =>
    Platform.OS === "android" ? ANDROID_API_MAP[Platform.Version] : undefined;

export const getWindowsApiContract = () =>
    Platform.OS === "windows"
        ? WINDOWS_API_CONTRACT_MAP[Platform.Version]?.release
        : undefined;
        
export const getAppleOSVersion = () => {
    if (Platform.OS === "ios" || Platform.OS === "macos")
        return Platform.Version;
};

export const getWebPlatformVersion = () =>
    Platform.OS === "web" ? Platform.Version.toString() : undefined;

export const getNormalizedVersionNumber = () => {
    if (
        Platform.OS === "ios" ||
        Platform.OS === "macos" ||
        Platform.OS === "web"
    )
        return Platform.Version.toString();
    if (Platform.OS === "android")
        return ANDROID_API_MAP[Platform.Version].toString() ?? undefined;
    if (Platform.OS === "windows")
        return WINDOWS_API_CONTRACT_MAP[Platform.Version]?.release ?? undefined;
};
