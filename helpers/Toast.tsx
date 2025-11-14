import { toast, ToastPosition } from "@backpackapp-io/react-native-toast";
import { Platform } from "react-native";

import NativeIcon from "../components/NativeIcons";
import borderRadius from "../theme/borderRadius";

type ToastProps = {
    message: string;
    type?: "success" | "error" | "loading" | "neutral" | "info";
    duration?: number;
};
export default function showToast({
    message,
    type = "info",
    duration = 4000,
}: ToastProps) {
    const toastTypeMap = {
        success: toast.success,
        error: toast.error,
        loading: toast.loading,
        info: toast,
        neutral: toast,
    };

    const showToastType = toastTypeMap[type];

    const iconMap = {
        success: "success",
        error: "error",
        loading: "loading",
        info: "info",
    };

    showToastType(message, {
        limit: 3,
        styles: {
            view: {
                marginTop: 16,
                marginRight: 16,
                paddingVertical: 12,
                paddingHorizontal: 16,
                borderRadius: borderRadius("toast"),
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
        duration,
        animationType: "spring",
        icon: type !== "neutral" && <NativeIcon name={iconMap[type]} />,
    });
}

export async function promiseToast<T>(
    promise: Promise<T>,
    messages: { loading: string; success: string; error: string }
): Promise<T> {
    showToast({ message: messages.loading, type: "loading" });

    try {
        const result = await promise;

        showToast({ message: messages.success, type: "success" });

        return result;
    } catch (e) {
        showToast({ message: messages.error, type: "error" });

        throw e;
    }
}

export async function loadingToast<T>(
    fn: () => Promise<T>,
    messages: { loading: string; success: string; error: string }
): Promise<T> {
    try {
        return await promiseToast(fn(), {
            loading: messages.loading,
            success: messages.success,
            error: messages.error,
        });
    } catch (e) {
        console.error("loadingToast failed:", e);

        throw e;
    }
}

//TODO: warning type
