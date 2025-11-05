import { Platform } from "react-native";
import { toast, ToastPosition } from "@backpackapp-io/react-native-toast";

type ToastProps = {
    message: string;
    type: "success" | "error" | "loading" | "neutral";
};
export default function showToast({
    message,
    type,
}: ToastProps) {
    const toastTypeMap = {
        "success": toast.success,
        "error": toast.error,
        "loading": toast.loading,
        "neutral": toast,
    };

    const showToastType = toastTypeMap[type];

    return showToastType(message, {
        limit: 3,
        styles: {
            view: {
                marginTop: 16,
                marginRight: 16,
                paddingVertical: 12,
                paddingHorizontal: 16,
                borderRadius: Platform.select({
                    ios: 10,
                    android: 12,
                    macos: 6,
                    windows: 4,
                    web: 4,
                    default: 4,
                }),
            },
        },
        position: Platform.select({
            ios: ToastPosition.TOP,
            android: ToastPosition.BOTTOM,
            macos: ToastPosition.TOP_RIGHT,
            windows: ToastPosition.TOP_RIGHT,
            web: ToastPosition.TOP_RIGHT,
            default: ToastPosition.TOP_RIGHT,
        }),
    });
}