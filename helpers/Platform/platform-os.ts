import { Platform } from "react-native";

type PlatformOptions<T> = {
  ios?: T;
  android?: T;
  macos?: T;
  windows?: T;
  web?: T;
  default?: T;
};

export const getPlatformOSWithCatalyst = () => {
  if (Platform.OS === "ios" && Platform.isMacCatalyst) return "macos";
  return Platform.OS;
}

export const getExtendedPlatformOS = () => {
  if (Platform.OS === "ios" && Platform.isPad) return "ipados";
  return getPlatformOSWithCatalyst();
}

/**
 * Returns a normalized platform identifier.
 *
 * @returns {string} One of the following platform identifiers:
 * - `"android-tv"` → Android-based TVs (Google TV, Fire TV, forks)
 * - `"tvos"`       → Apple TV
 * - `"visionos"`   → Apple Vision Pro
 * - `"ios"`        → iPhone
 * - `"ipados"`     → iPad
 * - `"macos"`      → Mac
 * - `"windows"`    → Windows
 * - `"web"`        → Web browsers
 */

export const getDetailedPlatformOS = () => {
  if (Platform.OS === "ios") {
    if (Platform.isPad) return "ipados";
    if (Platform.isMacCatalyst) return "macos";
    if (Platform.isVision) return "visionos";
    if (Platform.isTV) return "tvos";
  }
  if (Platform.OS === "android" && Platform.isTV) return "android-tv"
  return Platform.OS;
}

export const isWeb = Platform.OS === "web";
export const isIOS = Platform.OS === "ios" && 
  !(Platform.isPad || Platform.isMacCatalyst || Platform.isVision || Platform.isTV);
export const isIPadOS = Platform.OS === "ios" && Platform.isPad;
export const isMacCatalyst = Platform.OS === "ios" && Platform.isMacCatalyst;
export const isVisionOS = Platform.OS === "ios" && Platform.isVision;
export const isIOSFamily = Platform.OS === "ios";
export const isAndroid = Platform.OS === "android";
export const isWindows = Platform.OS === "windows";
export const isMacOS = Platform.OS === "macos";


export const selectPlatformValue = <T,>(options: PlatformOptions<T>): T | undefined => 
  Platform.select(options) ?? options.default;

export const isTesting = Platform.isTesting;


export const platform = {

};
