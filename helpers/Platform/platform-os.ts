import { Platform } from "react-native";
import { manufacturer, deviceType, DeviceType } from "expo-device";

export type PlatformId =
  | "ios"
  | "ipados"
  | "visionos"
  | "tvos"
  | "android"
  | "fireos"
  | "androidtv"
  | "chromeos"
  | "windows"
  | "macos"
  | "web";

type PlatformOptions<T> = {
  ios?: T;
  android?: T;
  macos?: T;
  windows?: T;
  web?: T;
  default?: T;
};

export const getPlatformOS = () => Platform.OS === "ios" && Platform.isMacCatalyst ? "macos" : Platform.OS;

export const getExtendedPlatformOS = () => {
  if (Platform.OS === "ios" && Platform.isPad) return "ipados";
  if (Platform.OS === "ios" && Platform.isMacCatalyst) return "macos";
  return Platform.OS;
};

/**
 * Returns a normalized platform identifier.
 *
 * @returns {string} One of the following platform identifiers:
 * - `"androidtv"`  → Android-based TVs (Google TV, Fire TV, forks)
 * - `"fireos"`     → Amazon's Fire OS for tablets and TVs
 * - `"chromeos"`   → ChromeOS
 * - `"android"`    → Android mobile devices + forks
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
  if (Platform.OS === "android" && Platform.isTV) return "androidtv"
  if (Platform.OS === "android" && manufacturer === "Amazon") return "fireos";
  if (Platform.OS === "android" && deviceType === DeviceType.DESKTOP) return "chromeos";
  return Platform.OS;
};

export const isWeb = Platform.OS === "web";
export const isIOS = Platform.OS === "ios" && 
  !(Platform.isPad || Platform.isMacCatalyst || Platform.isVision || Platform.isTV);
export const isIPadOS = Platform.OS === "ios" && Platform.isPad;
export const isMacCatalyst = Platform.OS === "ios" && Platform.isMacCatalyst;
export const isVisionOS = Platform.OS === "ios" && Platform.isVision;
export const isIOSFamily = Platform.OS === "ios";
export const isWindows = Platform.OS === "windows";
export const isMacOS = Platform.OS === "macos";
export const isAndroid = Platform.OS === "android";
export const isFireOS = Platform.OS === "android" && manufacturer === "Amazon";
export const isChromeOS = Platform.OS === "android" && deviceType === DeviceType.DESKTOP;


export const selectPlatformValue = <T,>(options: PlatformOptions<T>): T | undefined => 
  Platform.select(options) ?? options.default;

export const isTesting = Platform.isTesting;

export const resolvePreferredPlatformOS = (preferred: PlatformId[]): PlatformId | undefined => {
  if (Platform.OS === "ios") {
    if (Platform.isPad && preferred.includes("ipados")) return "ipados";
    if (Platform.isMacCatalyst && preferred.includes("macos")) return "macos";
    if (Platform.isVision && preferred.includes("visionos")) return "visionos";
    if (Platform.isTV && preferred.includes("tvos")) return "tvos";
    if (preferred.includes("ios"))return "ios";
  } else if (Platform.OS === "android") {
    if (Platform.isTV && preferred.includes("androidtv")) return "androidtv"
    if (manufacturer === "Amazon" && preferred.includes("fireos")) return "fireos";
    if (deviceType === DeviceType.DESKTOP && preferred.includes("chromeos")) return "chromeos";
    if (preferred.includes("android")) return "android";
  }
  if (Platform.OS === "web" && preferred.includes("web")) return "web";
  if (Platform.OS === "windows" && preferred.includes("windows")) return "windows";
  if (Platform.OS === "macos" && preferred.includes("macos")) return "macos";

  return undefined;
};

export const platform = {

};
