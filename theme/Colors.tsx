import { Platform, PlatformColor } from "react-native";

function getColor(...args: string[]) {
  if (["ios", "android", "windows"].includes(Platform.OS)) {
    return PlatformColor(...args);
  }

  return args[args.length - 1]
}

  // Native platforms (iOS, macOS, Android, Windows)
const colorMap = {
  // Backgrounds
  backgroundPrimary: getColor(
    "systemBackground",
    "?attr/colorBackground",
    "SystemColorWindowBrush",
    "#FFFFFF"
  ),
  backgroundSecondary: getColor(
    "secondarySystemBackground",
    "?attr/colorBackgroundFloating",
    "SystemColorControlBrush",
    "#F5F5F5"
  ),

  // Text
  textPrimary: getColor(
    "labelColor",
    "?android:attr/textColorPrimary",
    "SystemColorWindowTextBrush",
    "#000000"
  ),
  textSecondary: getColor(
    "secondaryLabelColor",
    "?android:attr/textColorSecondary",
    "SystemColorGrayTextBrush",
    "#666666"
  ),

  // Accents / States
  accentPrimary: getColor(
    "systemBlue",
    "?attr/colorAccent",
    "SystemColorHighlightBrush",
    "#007AFF"
  ),
  error: getColor(
    "systemRed",
    "?attr/colorError",
    "SystemColorErrorTextBrush",
    "#FF3B30"
  ),
  success: getColor(
    "systemGreen",
    "?attr/colorPrimary",
    "SystemColorSuccessTextBrush",
    "#34C759"
  ),
  warning: getColor(
    "systemOrange",
    "?attr/colorWarning",
    "SystemColorWarningTextBrush",
    "#FF9500"
  ),

  // Buttons
  buttonPrimaryBackground: getColor(
    "systemBlue",
    "?attr/colorAccent",
    "SystemColorHighlightBrush",
    "#007AFF"
  ),
  buttonPrimaryText: getColor(
    "whiteColor",
    "?android:attr/textColorPrimaryInverse",
    "SystemColorWindowTextBrush",
    "#FFFFFF"
  ),
  buttonSecondaryBackground: getColor(
    "secondarySystemBackground",
    "?attr/colorBackgroundFloating",
    "SystemColorControlBrush",
    "#F5F5F5"
  ),
  buttonSecondaryText: getColor(
    "labelColor",
    "?android:attr/textColorPrimary",
    "SystemColorWindowTextBrush",
    "#000000"
  ),
  buttonBackground: getColor(
    "systemGray5",
    "?attr/colorBackground",
    "SystemColorControlLightBrush",
    "#E0E0E0"
  ),
  buttonDisabledBackground: getColor(
    "systemGray5",
    "?android:attr/colorBackground",
    "SystemColorGrayTextBrush",
    "#DDDDDD"
  ),
  buttonDisabledText: getColor(
    "systemGray",
    "?android:attr/textColorSecondary",
    "SystemColorGrayTextBrush",
    "#999999"
  ),

  // Interactive states
  pressedBackground: getColor(
    "systemGray4",
    "?attr/colorControlActivated",
    "SystemColorControlBrush",
    "#CCCCCC"
  ),
};

export default colorMap;