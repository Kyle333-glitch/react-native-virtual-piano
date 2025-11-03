import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { Piano } from "../lib/react-piano";

import usePersistentState from "../hooks/usePersistentState";
import { DEFAULTS } from "../lib/react-piano/styles";

export default function Index() {
    const [borderRadius] = usePersistentState(
        "borderRadius",
        DEFAULTS.BORDER_RADIUS
    );
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
    )
    const [blackNoteLabelColor] = usePersistentState(
        "blackNoteLabelColor",
        DEFAULTS.NOTE_LABEL_BLACK_COLOR
    )

    const [pressDepth] = usePersistentState(
        "pressDepth",
        DEFAULTS.PRESS_DEPTH
    );

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

    return (
        <SafeAreaView
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Piano
                noteRange={["c4", "c5"]}
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
            <Link href="/settings" asChild>
            </Link>
        </SafeAreaView>
    );
}
