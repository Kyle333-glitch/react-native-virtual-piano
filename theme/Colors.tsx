import { Platform, PlatformColor } from "react-native";

// Native platforms (iOS, macOS, Android, Windows)
const nativeColorMap = {
  // Backgrounds
  backgroundPrimary: PlatformColor(
    "systemBackground",
    "?attr/colorBackground",
    "SystemColorWindowBrush",
    "#FFFFFF"
  ),
  backgroundSecondary: PlatformColor(
    "secondarySystemBackground",
    "?attr/colorBackgroundFloating",
    "SystemColorControlBrush",
    "#F5F5F5"
  ),

  // Text
  textPrimary: PlatformColor(
    "labelColor",
    "?android:attr/textColorPrimary",
    "SystemColorWindowTextBrush",
    "#000000"
  ),
  textSecondary: PlatformColor(
    "secondaryLabelColor",
    "?android:attr/textColorSecondary",
    "SystemColorGrayTextBrush",
    "#666666"
  ),

  // Accents / States
  accentPrimary: PlatformColor(
    "systemBlue",
    "?attr/colorAccent",
    "SystemColorHighlightBrush",
    "#007AFF"
  ),
  error: PlatformColor(
    "systemRed",
    "?attr/colorError",
    "SystemColorErrorTextBrush",
    "#FF3B30"
  ),
  success: PlatformColor(
    "systemGreen",
    "?attr/colorPrimary",
    "SystemColorSuccessTextBrush",
    "#34C759"
  ),
  warning: PlatformColor(
    "systemOrange",
    "?attr/colorWarning",
    "SystemColorWarningTextBrush",
    "#FF9500"
  ),

  // Buttons
  buttonPrimaryBackground: PlatformColor(
    "systemBlue",
    "?attr/colorAccent",
    "SystemColorHighlightBrush",
    "#007AFF"
  ),
  buttonPrimaryText: PlatformColor(
    "whiteColor",
    "?android:attr/textColorPrimaryInverse",
    "SystemColorWindowTextBrush",
    "#FFFFFF"
  ),
  buttonSecondaryBackground: PlatformColor(
    "secondarySystemBackground",
    "?attr/colorBackgroundFloating",
    "SystemColorControlBrush",
    "#F5F5F5"
  ),
  buttonSecondaryText: PlatformColor(
    "labelColor",
    "?android:attr/textColorPrimary",
    "SystemColorWindowTextBrush",
    "#000000"
  ),
  buttonBackground: PlatformColor(
    "systemGray5",
    "?attr/colorBackground",
    "SystemColorControlLightBrush",
    "#E0E0E0"
  ),
  buttonDisabledBackground: PlatformColor(
    "systemGray5",
    "?android:attr/colorBackground",
    "SystemColorGrayTextBrush",
    "#DDDDDD"
  ),
  buttonDisabledText: PlatformColor(
    "systemGray",
    "?android:attr/textColorSecondary",
    "SystemColorGrayTextBrush",
    "#999999"
  ),

  // Interactive states
  pressedBackground: PlatformColor(
    "systemGray4",
    "?attr/colorControlActivated",
    "SystemColorControlBrush",
    "#CCCCCC"
  ),
};

// Default (web/other)
const defaultColorMap = {
  backgroundPrimary: "#FFFFFF",
  backgroundSecondary: "#F5F5F5",
  textPrimary: "#000000",
  textSecondary: "#666666",
  accentPrimary: "#007AFF",
  error: "#FF3B30",
  success: "#34C759",
  warning: "#FF9500",
  buttonPrimaryBackground: "#007AFF",
  buttonPrimaryText: "#FFFFFF",
  buttonSecondaryBackground: "#F5F5F5",
  buttonSecondaryText: "#000000",
  buttonBackground: "#E0E0E0",
  buttonDisabledBackground: "#DDDDDD",
  buttonDisabledText: "#999999",
  pressedBackground: "#CCCCCC",
};

const colorMap = 
  ["ios", "macos", "android", "windows"].includes(Platform.OS) ? nativeColorMap : defaultColorMap;

export default colorMap;