// © 2025 KYLE QUACH. ALL RIGHTS RESERVED.
// UNAUTHORIZED COPYING, DISTRIBUTION, MODIFICATION, OR USE OF THIS CODE, IN PART OR IN WHOLE, WITHOUT EXPRESS WRITTEN PERMISSION IS STRICTLY PROHIBITED.

import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Piano } from "../piano/react-native-virtual-piano";
import { DEFAULTS } from "../piano/react-native-virtual-piano/styles";

import usePersistentState from "../hooks/usePersistentState";
import Pressable from "../components/Pressable";

export default function Index() {
    // Wait for all settings to load before rendering
    const [borderRadius, setBorderRadius, borderRadiusLoading] =
        usePersistentState("borderRadius", DEFAULTS.BORDER_RADIUS);
    const [borderWidth] = usePersistentState(
        "borderWidth",
        DEFAULTS.BORDER_WIDTH
    );
    const [disabledBorderColor] = usePersistentState(
        "disabledBorderColor",
        DEFAULTS.DISABLED_BORDER_COLOR
    );
    const [disabledBorderWidth] = usePersistentState(
        "disabledBorderWidth",
        DEFAULTS.DISABLED_BORDER_WIDTH
    );

    const [whiteKeyColor] = usePersistentState(
        "whiteKeyColor",
        DEFAULTS.WHITE_KEY_COLOR
    );
    const [blackKeyColor] = usePersistentState(
        "blackKeyColor",
        DEFAULTS.BLACK_KEY_COLOR
    );
    const [pressedColor] = usePersistentState(
        "pressedColor",
        DEFAULTS.PRESSED_COLOR
    );
    const [disabledKeyColor] = usePersistentState(
        "disabledKeyColor",
        DEFAULTS.DISABLED_KEY_COLOR
    );
    const [borderColor] = usePersistentState(
        "borderColor",
        DEFAULTS.BORDER_COLOR
    );

    const [blackKeyHeight] = usePersistentState(
        "blackKeyHeight",
        DEFAULTS.BLACK_KEY_HEIGHT
    );
    const [whiteKeyHeight] = usePersistentState(
        "whiteKeyHeight",
        DEFAULTS.WHITE_KEY_HEIGHT
    );

    const [glissandoOn] = usePersistentState(
        "glissandoOn",
        DEFAULTS.GLISSANDO_ON
    );
    const [keyLiftOn] = usePersistentState("keyLiftOn", DEFAULTS.KEY_LIFT_ON);
    const [pressHapticOn] = usePersistentState(
        "pressHapticOn",
        DEFAULTS.PRESS_HAPTIC_ON
    );
    const [releaseHapticOn] = usePersistentState(
        "releaseHapticOn",
        DEFAULTS.RELEASE_HAPTIC_ON
    );

    const [hapticsStrength] = usePersistentState(
        "hapticsStrength",
        DEFAULTS.HAPTICS_STRENGTH
    );

    const [keyShrinkPercent] = usePersistentState(
        "keyShrinkPercent",
        DEFAULTS.KEY_SHRINK_PERCENT
    );

    const [whiteNoteLabelColor] = usePersistentState(
        "whiteNoteLabelColor",
        DEFAULTS.NOTE_LABEL_WHITE_COLOR
    );
    const [blackNoteLabelColor] = usePersistentState(
        "blackNoteLabelColor",
        DEFAULTS.NOTE_LABEL_BLACK_COLOR
    );

    const [pressDepth] = usePersistentState("pressDepth", DEFAULTS.PRESS_DEPTH);

    const [octaveShift, setOctaveShift] = usePersistentState("octaveShift", 0); //FIXME: allow for more fine-grained control

    const getNoteRange = (): [string, string] => {
        const baseStart = 4; // c4
        const baseEnd = 5; // c5
        return [`c${baseStart + octaveShift}`, `c${baseEnd + octaveShift}`];
    };

    const [keyColorSubset] = usePersistentState(
        "keyColorSubset",
        DEFAULTS.KEY_COLOR_SUBSET
    );
    const [onlyC] = usePersistentState("onlyC", DEFAULTS.ONLY_C);
    const [withOctaveNumbers] = usePersistentState(
        "withOctaveNumbers",
        DEFAULTS.WITH_OCTAVE_NUMBERS
    );
    const [special] = usePersistentState("special", DEFAULTS.SPECIAL);

    // Check if any settings are still loading
    const isLoading = [
        borderRadiusLoading,
        // Add other loading states here
    ].some((loading) => loading);

    if (isLoading) {
        return null;
    }

    return (
        <SafeAreaView
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <View style={{ flexDirection: "row", marginTop: 20, alignItems: "center" }}>
                <Pressable
                    onPress={() =>
                        setOctaveShift(Math.max(octaveShift - 1, -3))
                    }
                    style={{
                            padding: 10,
                            marginRight: 10,
                            borderRadius: 6,
                    }}
                >
                    <Text>Octave Down</Text>
                </Pressable>

                <Pressable
                    onPress={() => setOctaveShift(Math.max(octaveShift + 1, 3))}
                    style={{
                            padding: 10,
                            marginRight: 10,
                            borderRadius: 6,
                    }}
                >
                    <Text>Octave Up</Text>
                </Pressable>

                <Text>
                    Current Range: {getNoteRange()[0].toUpperCase()} -{" "}
                    {getNoteRange()[1].toUpperCase()}
                </Text>
            </View>

            <Piano
                noteRange={getNoteRange()}
                // Printing to console
                onNoteOn={(midi, ctx) => console.log("Note on:", midi, ctx)}
                onNoteOff={(midi, ctx) => console.log("Note off:", midi, ctx)}
                // Additional props, styling, and customization
                whiteKeyColor={whiteKeyColor}
                blackKeyColor={blackKeyColor}
                pressedColor={pressedColor}
                borderColor={borderColor}
                borderWidth={borderWidth}
                disabledBorderWidth={disabledBorderWidth}
                disabledBorderColor={disabledBorderColor}
                disabledKeyColor={disabledKeyColor}
                blackKeyHeight={blackKeyHeight}
                whiteKeyHeight={whiteKeyHeight}
                keyShrinkPercent={keyShrinkPercent}
                pressDepth={pressDepth}
                noteLabelWhiteColor={whiteNoteLabelColor}
                noteLabelBlackColor={blackNoteLabelColor}
                glissandoOn={glissandoOn}
                keyLiftOn={keyLiftOn}
                pressHapticOn={pressHapticOn}
                releaseHapticOn={releaseHapticOn}
                hapticsStrength={hapticsStrength}
            />
        </SafeAreaView>
    );
}
