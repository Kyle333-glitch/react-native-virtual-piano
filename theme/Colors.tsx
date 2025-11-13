import { PlatformColor } from "react-native";

const colorMap = {
  // Backgrounds
  backgroundPrimary: PlatformColor(
    "systemBackground", "?attr/colorBackground", "SystemColorWindowBrush", "#FFFFFF", "systemBackground"
  ),
  backgroundSecondary: PlatformColor(
    "secondarySystemBackground", "?attr/colorBackgroundFloating", "SystemColorControlBrush", "#F5F5F5", "secondarySystemBackground"
  ),

  // Text
  textPrimary: PlatformColor(
    "labelColor", "?android:attr/textColorPrimary", "SystemColorWindowTextBrush", "#000000", "labelColor"
  ),
  textSecondary: PlatformColor(
    "secondaryLabelColor", "?android:attr/textColorSecondary", "SystemColorGrayTextBrush", "#666666", "secondaryLabelColor"
  ),

  // Accents / States
  accentPrimary: PlatformColor(
    "systemBlue", "?attr/colorAccent", "SystemColorHighlightBrush", "#007AFF", "systemBlue"
  ),
  error: PlatformColor(
    "systemRed", "?attr/colorError", "SystemColorErrorTextBrush", "#FF3B30", "systemRed"
  ),
  success: PlatformColor(
    "systemGreen", "?attr/colorPrimary", "SystemColorSuccessTextBrush", "#34C759", "systemGreen"
  ),
  warning: PlatformColor(
    "systemOrange", "?attr/colorWarning", "SystemColorWarningTextBrush", "#FF9500", "systemOrange"
  ),

  // Buttons
  buttonPrimaryBackground: PlatformColor(
    "systemBlue", "?attr/colorAccent", "SystemColorHighlightBrush", "#007AFF", "systemBlue"
  ),
  buttonPrimaryText: PlatformColor(
    "whiteColor", "?android:attr/textColorPrimaryInverse", "SystemColorWindowTextBrush", "#FFFFFF", "whiteColor"
  ),
  buttonSecondaryBackground: PlatformColor(
    "secondarySystemBackground", "?attr/colorBackgroundFloating", "SystemColorControlBrush", "#F5F5F5", "secondarySystemBackground"
  ),
  buttonSecondaryText: PlatformColor(
    "labelColor", "?android:attr/textColorPrimary", "SystemColorWindowTextBrush", "#000000", "labelColor"
  ),
  buttonBackground: PlatformColor(
    "systemGray5", "?attr/colorBackground", "SystemColorControlLightBrush", "#E0E0E0", "systemGray5"
  ),
  buttonDisabledBackground: PlatformColor(
    "systemGray5", "?android:attr/colorBackground", "SystemColorGrayTextBrush", "#DDDDDD", "systemGray5"
  ),
  buttonDisabledText: PlatformColor(
    "systemGray", "?android:attr/textColorSecondary", "SystemColorGrayTextBrush", "#999999", "systemGray"
  ),

  // Interactive states
  pressedBackground: PlatformColor(
    "systemGray4", "?attr/colorControlActivated", "SystemColorControlBrush", "#CCCCCC", "systemGray4"
  ),
};

export default function color(role: keyof typeof colorMap) {
    return colorMap[role]
}