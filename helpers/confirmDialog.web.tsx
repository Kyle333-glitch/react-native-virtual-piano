import React, { useEffect, useRef } from "react";
import {
  Animated,
  Easing,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import showToast from "./Toast";

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

// Imperative API: call confirmDialog(options) to show
let showImpl: ((opts: ConfirmDialogOptions) => void) | null = null;

export default function confirmDialog(options: ConfirmDialogOptions) {
  if (!showImpl) {
    console.warn("ConfirmDialogProvider not mounted; dialog dropped.");
    return;
  }
  showImpl(options);
}

// Provider component to mount once at app root
export function ConfirmDialogProvider({ children }: { children: React.ReactNode }) {
  const [current, setCurrent] = React.useState<ConfirmDialogOptions | null>(null);

  showImpl = setCurrent;

  const close = () => setCurrent(null);

  return (
    <>
      {children}
      {current && (
        <ConfirmDialogPortal options={current} onClose={close} />
      )}
    </>
  );
}

function ConfirmDialogPortal({
  options,
  onClose,
}: {
  options: ConfirmDialogOptions;
  onClose: () => void;
}) {
  const {
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
    buttonOrder = "cancelLeft",
  } = options;

  // Animations
  const fade = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.94)).current;
  const translateY = useRef(new Animated.Value(12)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade, {
        toValue: 1,
        duration: 150,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        bounciness: 6,
        speed: 12,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 160,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const animateOut = (cb: () => void) => {
    Animated.parallel([
      Animated.timing(fade, {
        toValue: 0,
        duration: 120,
        easing: Easing.in(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 0.98,
        duration: 120,
        easing: Easing.in(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 10,
        duration: 120,
        easing: Easing.in(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start(cb);
  };

  const handleConfirm = () =>
    animateOut(() => {
      onConfirm();
      if (showConfirmToast)
        showToast({ message: confirmToastMessage, type: "success" });
      onClose();
    });

  const handleCancel = () =>
    animateOut(() => {
      onCancel();
      if (showCancelToast)
        showToast({ message: cancelToastMessage, type: "info" });
      onClose();
    });

  const handleNeutral = () =>
    animateOut(() => {
      onNeutral();
      if (showNeutralToast)
        showToast({ message: neutralToastMessage, type: "info" });
      onClose();
    });

  const base =
    buttonOrder === "cancelLeft"
      ? [
          { label: cancelLabel, action: handleCancel, role: "cancel" as const },
          { label: confirmLabel, action: handleConfirm, role: confirmButtonStyle },
        ]
      : [
          { label: confirmLabel, action: handleConfirm, role: confirmButtonStyle },
          { label: cancelLabel, action: handleCancel, role: "cancel" as const },
        ];

  const buttons = showNeutralButton
    ? [
        base[0],
        { label: neutralLabel, action: handleNeutral, role: "default" as const },
        base[1],
      ]
    : base;

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleCancel();
      } else if (e.key === "Enter") {
        e.preventDefault();
        handleConfirm();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  });

  return (
    <Modal transparent animationType="none" visible>
      <Animated.View
        style={[styles.overlay, { opacity: fade }]}
        accessibilityRole="none"
      >
        <Pressable
          style={styles.backdropHit}
          onPress={handleCancel}
          accessible={false}
        />
        <Animated.View
          style={[
            styles.dialog,
            { transform: [{ scale }, { translateY }] },
          ]}
            accessible={true}
            accessibilityRole="alert"
            accessibilityLabel={title}
            accessibilityHint={message}
            accessibilityViewIsModal={true}
        >
          <Text style={styles.title} id="confirm-dialog-title">
            {title}
          </Text>
          {message ? (
            <Text style={styles.message} id="confirm-dialog-message">
              {message}
            </Text>
          ) : null}
          <View style={styles.buttonsRow}>
            {buttons.map((b, i) => (
              <Pressable
                key={`${b.label}-${i}`}
                onPress={b.action}
                style={[styles.button, roleStyle(b.role)]}
                accessibilityRole="button"
                accessibilityLabel={b.label}
              >
                <Text style={styles.buttonText}>{b.label}</Text>
              </Pressable>
            ))}
          </View>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  backdropHit: {
    position: "absolute",
    inset: 0,
  } as any,
  dialog: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
    minWidth: 320,
    maxWidth: "92%",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  title: { fontSize: 18, fontWeight: "600", marginBottom: 8, color: "#111" },
  message: { marginBottom: 16, color: "#333", lineHeight: 20 },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 8,
  } as any,
  button: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#d0d7de",
    backgroundColor: "#f6f8fa",
  },
  buttonText: { color: "#111", fontWeight: "600" },
});

function roleStyle(role: "default" | "destructive" | "cancel") {
  switch (role) {
    case "destructive":
      return { backgroundColor: "#fee2e2", borderColor: "#fca5a5" };
    case "cancel":
      return { backgroundColor: "#e5e7eb", borderColor: "#d1d5db" };
    default:
      return { backgroundColor: "#e0f2fe", borderColor: "#7dd3fc" };
  }
}