import {
  deviceType,
  DeviceType,
  getDeviceTypeAsync as expo_device_getDeviceTypeAsync,
  isDevice as expo_device_isDevice,
} from "expo-device";
import { Platform } from "react-native";

export const getDeviceType = () => {
  switch (deviceType) {
    case DeviceType.PHONE: return "phone";
    case DeviceType.TABLET: return "tablet";
    case DeviceType.DESKTOP: return "desktop";
    case DeviceType.TV: return "tv";
    case DeviceType.UNKNOWN: return undefined;
  }
};

export const getDeviceTypeAsync = async () => await expo_device_getDeviceTypeAsync();

export const isMobile = deviceType === DeviceType.PHONE || deviceType === DeviceType.TABLET;
export const isPhone = deviceType === DeviceType.PHONE;
export const isTablet = deviceType === DeviceType.TABLET;
export const isDesktop = deviceType === DeviceType.DESKTOP;
export const isTV = deviceType === DeviceType.TV;
export const isSpacial = Platform.OS === "ios" && Platform.isVision;

export const isSimulator = !expo_device_isDevice;
export const isDevice = expo_device_isDevice;
