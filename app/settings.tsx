import SegmentedControl from "@react-native-segmented-control/segmented-control";
import { Platform, ScrollView, Switch, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Stepper from "../components/Stepper";

import { DEFAULTS, headerStyles } from "@/lib/react-piano/styles";
import usePersistentState from "../hooks/usePersistentState";

export default function Settings() {
    const [glissandoOn, setGlissandoOn] = usePersistentState(
        "glissandoOn",
        DEFAULTS.GLISSANDO_ON
    );
    const [keyLiftOn, setKeyLiftOn] = usePersistentState(
        "keyLiftOn",
        DEFAULTS.KEY_LIFT_ON
    );
    const [pressHapticOn, setPressHapticOn] = usePersistentState(
        "pressHapticOn",
        DEFAULTS.PRESS_HAPTIC_ON
    );
    const [releaseHapticOn, setReleaseHapticOn] = usePersistentState(
        "releaseHapticOn",
        DEFAULTS.RELEASE_HAPTIC_ON
    );

    const hapticsStrengthOptions = ["Light", "Medium", "Heavy"];
    const [hapticsStrength, setHapticsStrength] = usePersistentState(
        "hapticsStrength",
        DEFAULTS.HAPTICS_STRENGTH
    );

    const [keyShrinkPercent, setKeyShrinkPercent] = usePersistentState(
        "keyShrinkPercent",
        DEFAULTS.KEY_SHRINK_PERCENT
    );

    const [keyColorSubset, setKeyColorSubset] = usePersistentState(
        "keyColorSubset",
        DEFAULTS.KEY_COLOR_SUBSET
    );
    const [onlyC, setOnlyC] = usePersistentState("onlyC", DEFAULTS.ONLY_C);
    const [withOctaveNumbers, setWithOctaveNumbers] = usePersistentState(
        "withOctaveNumbers",
        DEFAULTS.WITH_OCTAVE_NUMBERS
    );
    const [special, setSpecial] = usePersistentState(
        "special",
        DEFAULTS.SPECIAL
    );

    const specialOptions = [
        { label: "None", value: "None" },
        { label: "ActiveKeys", value: "ActiveKeys" },
        { label: "Solfege", value: "Solfege" },
        { label: "OnlyDo", value: "OnlyDo" },
        { label: "OnlyMiddleCDo", value: "OnlyMiddleCDo" },
        { label: "Unset", value: "Unset" },
    ];

    return (
        <SafeAreaView
            style={{
                flex: 1,
                padding: 16,
            }}
        >
            <ScrollView>
                <Text style={headerStyles.smallSectionHeader}>Glissando</Text>
                <Switch value={glissandoOn} onValueChange={setGlissandoOn} />

                <Text style={headerStyles.smallSectionHeader}>
                    Key Lift Effect
                </Text>
                <Switch value={keyLiftOn} onValueChange={setKeyLiftOn} />

                <Text style={headerStyles.smallSectionHeader}>
                    Press Haptics
                </Text>
                <Switch
                    value={pressHapticOn}
                    onValueChange={setPressHapticOn}
                />

                <Text style={headerStyles.smallSectionHeader}>
                    Release Haptics
                </Text>
                <Switch
                    value={releaseHapticOn}
                    onValueChange={setReleaseHapticOn}
                />

                <Text style={headerStyles.mediumSectionHeader}>
                    Press Haptic Strength
                </Text>
                <SegmentedControl
                    values={hapticsStrengthOptions}
                    selectedIndex={hapticsStrengthOptions.indexOf(
                        hapticsStrength
                    )}
                    onChange={(event) => {
                        const index = event.nativeEvent.selectedSegmentIndex;
                        setHapticsStrength(hapticsStrengthOptions[index]);
                    }}
                />

                <Text style={headerStyles.mediumSectionHeader}>
                    Key Shrink: {keyShrinkPercent}%
                </Text>
                <Stepper
                    value={keyShrinkPercent}
                    onChange={setKeyShrinkPercent}
                    minValue={50}
                    maxValue={100}
                    step={5}
                    rounded={Platform.OS !== "android"}
                />

                <Text style={headerStyles.sectionHeader}>
                    Key Label Mode:{" "}
                    {special != "Unset"
                        ? `${special}`
                        : `For ${keyColorSubset.toLowerCase()} color keys, show ${
                              onlyC ? "only C's" : "all notes"
                          }
                    ${
                        withOctaveNumbers
                            ? " with octave numbers"
                            : " without octave numbers"
                    }`}
                </Text>
                <Text style={headerStyles.smallSectionHeader}>
                    Applies to: {keyColorSubset.toLowerCase()} color keys
                </Text>
                <SegmentedControl
                    values={["All", "White", "Black"]}
                    selectedIndex={["All", "White", "Black"].indexOf(
                        keyColorSubset
                    )}
                    onChange={(event) => {
                        const index = event.nativeEvent.selectedSegmentIndex;
                        setKeyColorSubset(["All", "White", "Black"][index]);
                    }}
                />

                <Text style={headerStyles.smallSectionHeader}>
                    {onlyC ? "Applies only to C's" : "Applies to all notes"}
                </Text>
                <Switch value={onlyC} onValueChange={setOnlyC} />

                <Text style={headerStyles.smallSectionHeader}>
                    {withOctaveNumbers
                        ? "Shows octave numbers"
                        : "Doesn't show octave numbers"}
                </Text>
                <Switch
                    value={withOctaveNumbers}
                    onValueChange={setWithOctaveNumbers}
                />

                <Text style={headerStyles.mediumSectionHeader}>
                    Special Options (overrides other settings)
                </Text>
                <SegmentedControl
                    values={specialOptions.map((o) => o.label)}
                    selectedIndex={specialOptions.findIndex(
                        (o) => o.value === special
                    )}
                    onChange={(event) => {
                        const index = event.nativeEvent.selectedSegmentIndex;
                        setSpecial(specialOptions[index].value);
                    }}
                />
            </ScrollView>
        </SafeAreaView>
    );
}
