import { Alert, Platform } from "react-native";

import showToast from "./Toast";

import { AlertButton } from "react-native";

export type ConfirmDialogOptions = {
    title: string;
    message?: string;
    confirmLabel?: string;
    cancelLabel?: string;
    neutralLabel?: string;
    onConfirm: () => void;
    onCancel?: () => void;
    onNeutral?: () => void;
    showConfirmToast?: boolean;
    showCancelToast?: boolean;
    showNeutralToast?: boolean;
    confirmToastMessage?: string;
    cancelToastMessage?: string;
    neutralToastMessage?: string;
    confirmButtonStyle?: "default" | "destructive";
    showNeutralButton?: boolean;
    buttonOrder?: "confirmLeft" | "cancelLeft";
};

export default function confirmDialog({
    title,
    message = "",
    confirmLabel = "OK",
    cancelLabel = "Cancel",
    neutralLabel = "Later",
    onConfirm,
    onCancel = () => {},
    onNeutral = () => {},
    showConfirmToast = true,
    showCancelToast = true,
    showNeutralToast = true,
    confirmToastMessage = "Action confirmed",
    cancelToastMessage = "Action canceled",
    neutralToastMessage = "Action deferred",
    confirmButtonStyle = "default",
    showNeutralButton = false,
    buttonOrder = Platform.select({
        ios: "cancelLeft",
        android: "cancelLeft", // Android may forcefully reorder Alert buttons [Cancel, Ok] in left to right languages
        macos: "cancelLeft",
        windows: "confirmLeft",
        web: "cancelLeft",
        default: "cancelLeft",
    }),
}: ConfirmDialogOptions) {
    const handleCancel = () => {
        onCancel();
        if (showCancelToast) {
            showToast({ message: cancelToastMessage, type: "info" });
        }
    };

    const handleConfirm = () => {
        onConfirm();
        if (showConfirmToast) {
            showToast({ message: confirmToastMessage, type: "success" });
        }
    };

    const handleNeutral = () => {
        onNeutral();
        if (showNeutralToast) {
            showToast({ message: neutralToastMessage, type: "info" });
        }
    };

    const baseButtons: AlertButton[] = buttonOrder === "cancelLeft"
        ? [
            { text: cancelLabel, style: "cancel", onPress: handleCancel },
            { text: confirmLabel, style: confirmButtonStyle, onPress: handleConfirm },
        ]
        : [
            { text: confirmLabel, style: confirmButtonStyle, onPress: handleConfirm },
            { text: cancelLabel, style: "cancel", onPress: handleCancel },      
        ];

    const buttons: AlertButton[] = showNeutralButton
            ? [
                baseButtons[0],
                { text: neutralLabel, style: "default", onPress: handleNeutral },
                baseButtons[1],
            ]
            : baseButtons;

    Alert.alert(title, message, buttons);
}
