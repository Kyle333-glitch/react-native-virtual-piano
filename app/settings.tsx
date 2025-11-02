import { useState, useEffect } from "react";
import { Text, View, Switch, Platform, ScrollView, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import NumericInput from "react-native-numeric-input";
import ColorPicker, {
  Panel1,
  HueSlider,
  OpacitySlider,
  Preview,
} from "reanimated-color-picker";
import AsyncStorage from "@react-native-async-storage/async-storage"
import { DEFAULTS, headerStyles } from "@/lib/react-piano/styles";

const savePreference = async (key: string, value: any) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
        console.error("Error saving preference: ", e);
    }
};

const loadPreference = async (key: string, defaultValue: any) => {
    try {
        const value = await AsyncStorage.getItem(key);
        return value !== null ? JSON.parse(value) : defaultValue
    } catch (e) {
        console.error("Error loading preference: ", e);
        return defaultValue;
    }
};

function usePersistentState<T>(key: string, defaultValue: T): [T, (val: T) => void] {
    const [state, setState] = useState<T>(defaultValue);

    useEffect(() => {
        (async () => {
            try {
                const stored = await AsyncStorage.getItem(key);
                if (stored !== null) {
                    setState(JSON.parse(stored));
                }
            } catch (e) {
                console.error("Failed to load", e)
            }
        })();
    }, [key]);

    const setAndStore = (val: T) => {
        setState(val);
        AsyncStorage.setItem(key, JSON.stringify(val)).catch(e =>
            console.error("Failed to save", key, e)
        );
    };

    return [state, setAndStore];
}

export default function Settings() {
const [glissandoOn, setGlissandoOn] = usePersistentState("glissandoOn", DEFAULTS.GLISSANDO_ON);
const [keyLiftOn, setKeyLiftOn] = usePersistentState("keyLiftOn", DEFAULTS.KEY_LIFT_ON);
const [pressHapticOn, setPressHapticOn] = usePersistentState("pressHapticOn", DEFAULTS.PRESS_HAPTIC_ON);
const [releaseHapticOn, setReleaseHapticOn] = usePersistentState("releaseHapticOn", DEFAULTS.RELEASE_HAPTIC_ON);

const hapticsStrengthOptions = ["Light", "Medium", "Heavy"];
const [hapticsStrength, setHapticsStrength] = usePersistentState("hapticsStrength", DEFAULTS.HAPTICS_STRENGTH);

const [borderRadius, setBorderRadius] = usePersistentState("borderRadius", DEFAULTS.BORDER_RADIUS);
const [borderWidth, setBorderWidth] = usePersistentState("borderWidth", DEFAULTS.BORDER_WIDTH);
const [disabledBorderWidth, setDisabledBorderWidth] = usePersistentState("disabledBorderWidth", DEFAULTS.DISABLED_BORDER_WIDTH);

const [whiteKeyColor, setWhiteKeyColor] = usePersistentState("whiteKeyColor", DEFAULTS.WHITE_KEY_COLOR);
const [blackKeyColor, setBlackKeyColor] = usePersistentState("blackKeyColor", DEFAULTS.BLACK_KEY_COLOR);
const [pressedColor, setPressedColor] = usePersistentState("pressedColor", DEFAULTS.PRESSED_COLOR);
const [disabledKeyColor, setDisabledKeyColor] = usePersistentState("disabledKeyColor", DEFAULTS.DISABLED_KEY_COLOR);
const [borderColor, setBorderColor] = usePersistentState("borderColor", DEFAULTS.BORDER_COLOR);

const [keyLabelMode, setKeyLabelMode] = usePersistentState("keyLabelMode", DEFAULTS.KEY_LABEL_MODE);
const [keyShrinkPercent, setKeyShrinkPercent] = usePersistentState("keyShrinkPercent", DEFAULTS.KEY_SHRINK_PERCENT);
const [blackKeyHeight, setBlackKeyHeight] = usePersistentState("blackKeyHeight", DEFAULTS.BLACK_KEY_HEIGHT);
const [whiteKeyHeight, setWhiteKeyHeight] = usePersistentState("whiteKeyHeight", DEFAULTS.WHITE_KEY_HEIGHT);

const [keyColorSubset, setKeyColorSubset] = usePersistentState("keyColorSubset", DEFAULTS.KEY_COLOR_SUBSET);
const [onlyC, setOnlyC] = usePersistentState("onlyC", DEFAULTS.ONLY_C);
const [withOctaveNumbers, setWithOctaveNumbers] = usePersistentState("withOctaveNumbers", DEFAULTS.WITH_OCTAVE_NUMBERS);
const [special, setSpecial] = usePersistentState("special", DEFAULTS.SPECIAL);

    const { width, height } = Dimensions.get("window");

    const specialOptions = [
        { label: "None", value: "None" },
        { label: "ActiveKeys", value: "ActiveKeys" },
        { label: "Solfege", value: "Solfege" },
        { label: "OnlyDo", value: "OnlyDo" },
        { label: "OnlyMiddleCDo", value: "OnlyMiddleCDo" },
        { label: "Unset", value: "Unset" },
    ];

    const keyLabelModes = [
        { label: "All Keys", value: "all" },
        { label: "All Keys With Octave", value: "all_octave" },
        { label: "None", value: "none" },
        { label: "Only C's", value: "c_only" },
        { label: "Only Middle C", value: "middle_c" },

        { label: "White Keys Only", value: "white" },
        { label: "White Keys Only With Octave", value: "white_octave" },
        { label: "Black Keys Only", value: "black" },
        { label: "Black Keys Only With Octave", value: "black_octave" },

        // Dynamic / contextual
        { label: "Active Keys Only", value: "active" },

        // Solfege / Do-based
        { label: "Solfege", value: "solfege" },
        { label: "Only Do", value: "do_only" },
        { label: "Only Middle C Do", value: "middle_c_do" },
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
        <Switch
            value={glissandoOn}
            onValueChange={setGlissandoOn}
        />

        <Text style={headerStyles.smallSectionHeader}>Key Lift Effect</Text>
        <Switch
            value={keyLiftOn}
            onValueChange={setKeyLiftOn}
        />

        <Text style={headerStyles.smallSectionHeader}>Press Haptics</Text>
        <Switch
            value={pressHapticOn}
            onValueChange={setPressHapticOn}
        />

        <Text style={headerStyles.smallSectionHeader}>Release Haptics</Text>
        <Switch
            value={releaseHapticOn}
            onValueChange={setReleaseHapticOn}
        />

        <Text style={headerStyles.mediumSectionHeader}>Press Haptic Strength</Text>
        <SegmentedControl
            values={hapticsStrengthOptions}
            selectedIndex={hapticsStrengthOptions.indexOf(hapticsStrength)}
            onChange={(event) => {
                const index = event.nativeEvent.selectedSegmentIndex;
                setHapticsStrength(hapticsStrengthOptions[index]);
            }}
        />

        <Text style={headerStyles.mediumSectionHeader}>Key Border Radius</Text>
        <NumericInput
            value={borderRadius}
            onChange={setBorderRadius}
            minValue={0}
            maxValue={20}
            step={1}
            textColor="black"
            rounded={Platform.OS !== "android"}
        />

        <Text style={headerStyles.mediumSectionHeader}>Key Border Width</Text>
        <NumericInput
            value={borderWidth}
            onChange={setBorderWidth}
            minValue={0}
            maxValue={10}
            step={1}
            textColor="black"
            rounded={Platform.OS !== "android"}
        />

        <Text style={headerStyles.mediumSectionHeader}>Disabled Key Border Width</Text>
        <NumericInput
            value={disabledBorderWidth}
            onChange={setDisabledBorderWidth}
            minValue={0}
            maxValue={10}
            step={1}
            textColor="black"
            rounded={Platform.OS !== "android"}
        />

        <Text style={headerStyles.mediumSectionHeader}>White Key Color</Text>
        <ColorPicker value={whiteKeyColor} onComplete={({ hex }) => setWhiteKeyColor(hex)} style={{ width: width / 6}}>
            <Preview/>
            <Panel1/>
            <HueSlider/>
        </ColorPicker>

        <Text style={headerStyles.mediumSectionHeader}>Black Key Color</Text>
        <ColorPicker value={blackKeyColor} onComplete={({ hex }) => setBlackKeyColor(hex)} style={{ width: width / 6}}>
            <Preview/>
            <Panel1/>
            <HueSlider/>
        </ColorPicker>

        <Text style={headerStyles.mediumSectionHeader}>Pressed Color</Text>
        <ColorPicker value={pressedColor} onComplete={({ hex }) => setPressedColor(hex)} style={{ width: width / 6}}>
            <Preview/>
            <Panel1/>
            <HueSlider/>
        </ColorPicker>

        <Text style={headerStyles.mediumSectionHeader}>Disabled Key Color</Text>
        <ColorPicker value={disabledKeyColor} onComplete={({ hex }) => setDisabledKeyColor(hex)} style={{ width: width / 6}}>
            <Preview/>
            <Panel1/>
            <HueSlider/>
        </ColorPicker>

        <Text style={headerStyles.mediumSectionHeader}>Border Color</Text>
        <ColorPicker value={borderColor} onComplete={({ hex }) => setBorderColor(hex)} style={{ width: width / 6}}>
            <Preview/>
            <Panel1/>
            <HueSlider/>
        </ColorPicker>

        <Text style={headerStyles.mediumSectionHeader}>Key Shrink: {keyShrinkPercent}%</Text>
        <NumericInput
            value={keyShrinkPercent}
            onChange={setKeyShrinkPercent}
            minValue={50}
            maxValue={100}
            step={5}
            rounded={Platform.OS !== "android"}
        />

        <Text style={headerStyles.mediumSectionHeader}>Black Key Height: {blackKeyHeight}%</Text>
        <NumericInput
            value={blackKeyHeight}
            onChange={setBlackKeyHeight}
            minValue={40}
            maxValue={100}
            step={5}
            rounded={Platform.OS !== "android"}
        />

        <Text style={headerStyles.mediumSectionHeader}>White Key Height: {whiteKeyHeight}%</Text>
        <NumericInput
            value={whiteKeyHeight}
            onChange={setWhiteKeyHeight}
            minValue={50}
            maxValue={100}
            step={5}
            rounded={Platform.OS !== "android"}
        />

        <Text style={headerStyles.sectionHeader}>Key Label Mode: { special != "Unset"
            ? `${special}`
            : `For ${keyColorSubset.toLowerCase()} color keys, show ${onlyC ? "only C's" : "all notes"}
            ${withOctaveNumbers ? " with octave numbers" : " without octave numbers"}`
        }

        </Text>
        <Text style={headerStyles.smallSectionHeader}>Applies to: {keyColorSubset.toLowerCase()} color keys</Text>
        <SegmentedControl
            values={["All", "White", "Black"]}
            selectedIndex={["All", "White", "Black"].indexOf(keyColorSubset)}
            onChange={(event) => {
                const index = event.nativeEvent.selectedSegmentIndex;
                setKeyColorSubset(["All", "White", "Black"][index]);
            }}
        />

        <Text style={headerStyles.smallSectionHeader}>{onlyC ? "Applies only to C's" : "Applies to all notes"}</Text>
        <Switch
            value={onlyC}
            onValueChange={setOnlyC}
        />
        
        <Text style={headerStyles.smallSectionHeader}>{withOctaveNumbers ? "Shows octave numbers" : "Doesn't show octave numbers"}</Text>
        <Switch
            value={withOctaveNumbers}
            onValueChange={setWithOctaveNumbers}
        />

        <Text style={headerStyles.mediumSectionHeader}>Special Options (overrides other settings)</Text>
        <SegmentedControl
            values={specialOptions.map((o) => o.label)}
            selectedIndex={specialOptions.findIndex((o) => o.value === special)}
            onChange={(event) => {
                const index = event.nativeEvent.selectedSegmentIndex;
                setSpecial(specialOptions[index].value);
            }}
        />
        </ScrollView>
    </SafeAreaView>

    
    );
}