import { useRef, useState } from "react";
import { Pressable, Platform, StyleSheet, StyleProp, ViewStyle, Text, Animated, View } from "react-native";
import * as Haptics from "expo-haptics";

import type { ReactNode } from "react";

import { isLightMode } from "../theme/ThemeProvider";
import colors from "../theme/colors";

type PressableFeedbackProps = {
    children?: ReactNode | String,
    text? : string,
    onPress: () => void,
    style?: StyleProp<ViewStyle>,
    accessibilityLabel?: string,
    accessibilityHint?: string,
    borderless?: boolean,
    variant?: "primary" | "secondary" | "regular";
};

export default function PressableFeedback({
    children,
    text,
    onPress,
    style,
    accessibilityLabel,
    accessibilityHint,
    borderless = false,
    variant = "regular",
}: PressableFeedbackProps) {
    const [dimensions, setDimensions] = useState({ width: 0, height: 0});

    const borderWidth = useRef(new Animated.Value(
        variant === "primary" ? 0 : variant === "secondary" ? 2 : 1
    )).current;
    const scale = useRef(new Animated.Value(1)).current;
    const opacity = useRef(new Animated.Value(1)).current;

    const onPressIn = () => {
        Animated.parallel([
            Animated.spring(scale, {
                toValue: 0.95,
                useNativeDriver: true,
            }),
            Animated.spring(borderWidth, {
                toValue: variant === "primary" ? 1 : variant === "secondary" ? 3 : 2,
                useNativeDriver: false, // borderWidth must be JS-driven
            }),
            Animated.timing(opacity, {
                toValue: 0.7,
                duration: 150,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const onPressOut = () => {
        Animated.parallel([
            Animated.spring(scale, {
                toValue: 1,
                friction: 3,
                useNativeDriver: true,
            }),
            Animated.spring(borderWidth, {
                toValue: variant === "primary" ? 0 : variant === "secondary" ? 2 : 1,
                friction: 3,
                useNativeDriver: false, // borderWidth must be JS-driven
            }),
            Animated.timing(opacity, {
                toValue: 1,
                duration: 150,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const borderRadius = Platform.select({
        ios: variant === "primary" ? 16 : variant === "secondary" ? 12 : 8,
        macos: variant === "primary" ? 12 : variant === "secondary" ? 8 : 6,
        android: variant === "primary" ? 10 : variant === "secondary" ? 6 : 4,
        windows: variant === "primary" ? 8 : variant === "secondary" ? 6 : 4,
        web: variant === "primary" ? 8 : variant === "secondary" ? 6 : 4,
        default: variant === "primary" ? 8 : variant === "secondary" ? 6 : 4,
    });

    const label = accessibilityLabel || text || (typeof children === "string" ? children : undefined);
    const hint = accessibilityHint ||
    (variant === "primary"
        ? "Executes the main action"
        : variant === "secondary"
        ? "Performs a secondary action"
        : "Does a regular action"
    );
    
    const handlePress = async () => {
        if (variant === "primary") {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid)
            //TODO: sound cue
        } else if (variant === "secondary") {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
        } else if (variant === "regular") {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft)
        } else {
            console.error("handlePress is only able to handle variants primary, secondary, and regular.")
        }
        onPress();
    };

    return (
        <Pressable
            onPress={handlePress}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            accessibilityRole="button"
            accessibilityLabel={label}
            accessibilityHint={hint}
            tabIndex={0}
            onLayout={e => {
                const { width, height } = e.nativeEvent.layout;
                setDimensions({ width, height });
            }}
            hitSlop={{
                top: Math.max(0, (48 - dimensions.height) / 2),
                bottom: Math.max(0, (48 - dimensions.height) / 2),
                left: Math.max(0, (48 - dimensions.width) / 2),
                right: Math.max(0, (48 - dimensions.width) / 2),
            }}
            android_ripple={
                Platform.OS === "android" ? 
                { color: "rgba(255,255,255,0.2)", borderless: borderless } 
                : undefined
            }
            style={({ pressed }) => 
                StyleSheet.flatten([
                    styles.base,
                    variant === "primary" && styles.primary,
                    variant === "secondary" && styles.secondary,
                    variant === "regular" && styles.regular,
                    { borderRadius },
                    style,
                    pressed &&
                        (variant === "primary"
                            ? styles.pressedShadow
                            : variant === "secondary"
                            ? styles.lightPressedShadow
                            : undefined
                        ),
                ])
            }
        >
            {({ pressed }) => (
                <Animated.View 
                    style={[{
                        transform: [{ scale }],
                        borderRadius,
                        opacity,
                        borderWidth,
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                    },
                    variant === "primary" && styles.primary,
                    variant === "secondary" && styles.secondary,
                    variant === "regular" && styles.regular,
                    ]}
                >
                    {text ? (
                        <Text 
                            style={variant==="primary" ? styles.primaryText 
                                : variant==="secondary" ? styles.secondaryText 
                                : null
                                }
                        >
                            {text}
                        </Text>
                    ) : ( 
                        children 
                    )}
                    { pressed && <View style={[styles.darkOverlay, { borderRadius }]}/> }
                </Animated.View>
            )}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    base: {
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
    },
    primary: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 4,
        paddingVertical: 12,
        paddingHorizontal: 20,
        marginVertical: 16,
        marginHorizontal: 12,
        backgroundColor: colors.accentPrimary,
    },
    primaryText: {
        fontWeight: "600",
    },
    secondary: {
        elevation: 2,
        paddingVertical: 10,
        paddingHorizontal: 16,
        marginVertical: 12,
        marginHorizontal: 8,
        backgroundColor: colors.buttonSecondaryBackground,
    },
    secondaryText: {
        fontWeight: "500",
    },
    regular: {
        elevation: 0,
        shadowOpacity: 0,
        paddingVertical: 8,
        paddingHorizontal: 12,
        marginVertical: 8,
        marginHorizontal: 6,
        backgroundColor: colors.buttonBackground,
    },
    pressedShadow: {
        ...Platform.select({
            ios: {
                shadowOpacity: 0.3,
                shadowRadius: 6,
                shadowOffset: { width: 0, height: 4 },
            },
            android: {
                elevation: 8
            },
            web: {
                boxShadow: "0px 2px 4px rgba(0,0,0,0.2)"
            },
            default: {}, // no shadows on macos or windows
        }),
    },
    lightPressedShadow: {
        ...Platform.select({
            ios: {
                shadowOpacity: 0.15,
                shadowRadius: 3,
                shadowOffset: { width: 0, height: 2 },
            },
            android: {
                elevation: 4
            },
            web: {
                boxShadow: "0px 1px 2px rgba(0,0,0,0.15)"
            },
            default: {}, // no shadows on macos or windows
        }),
    },
    darkOverlay: {
        ...StyleSheet.absoluteFillObject, // Completely overlays button
        backgroundColor: "rgba(0,0,0,0.15)",
    },
});

// primary-level buttons: haptics(ridid), sound cues, shrink, shadow/elevation change
// secondary-level buttons: opacity darken, light shadow/elevation, border change, haptics (medium)
// regular buttons (default, unintrusive): opacity fade, border change, haptics (light)