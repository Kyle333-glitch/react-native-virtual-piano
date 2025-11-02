import { useState } from "react";
import { Text, View, Switch, Platform, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import NumericInput from "react-native-numeric-input";
import ColorPicker, {
  Panel1,
  HueSlider,
  OpacitySlider,
  Preview,
} from "reanimated-color-picker";
import { DEFAULTS } from "@/lib/react-piano/styles";

export default function Settings() {
    const [glissandoOn, setGlissandoOn] = useState(DEFAULTS.GLISSANDO_ON);
    const [keyLiftOn, setKeyLiftOn] = useState(DEFAULTS.KEY_LIFT_ON);
    const [pressHapticOn, setPressHapticOn] = useState(DEFAULTS.PRESS_HAPTIC_ON);
    const [releaseHapticOn, setReleaseHapticOn] = useState(DEFAULTS.RELEASE_HAPTIC_ON);
    const [hapticsStrength, setHapticsStrength] = useState(DEFAULTS.HAPTICS_STRENGTH);
    const hapticsStrengthOptions = ["Light", "Medium", "Heavy"];
    const [borderRadius, setBorderRadius] = useState(DEFAULTS.BORDER_RADIUS);
    const [borderWidth, setBorderWidth] = useState(DEFAULTS.BORDER_WIDTH);
    const [disabledBorderWidth, setDisabledBorderWidth] = useState(DEFAULTS.DISABLED_BORDER_WIDTH);
    const [whiteKeyColor, setWhiteKeyColor] = useState(DEFAULTS.WHITE_KEY_COLOR);
    const [blackKeyColor, setBlackKeyColor] = useState(DEFAULTS.BLACK_KEY_COLOR);
    const [pressedColor, setPressedColor] = useState(DEFAULTS.PRESSED_COLOR);
    const [disabledKeyColor, setDisabledKeyColor] = useState(DEFAULTS.DISABLED_KEY_COLOR);
    const [borderColor, setBorderColor] = useState(DEFAULTS.BORDER_COLOR);
    const [keyLabelMode, setKeyLabelMode] = useState(DEFAULTS.KEY_LABEL_MODE);
    const [keyShrinkPercent, setKeyShrinkPercent] = useState(DEFAULTS.KEY_SHRINK_PERCENT);
    const [blackKeyHeight, setBlackKeyHeight] = useState(DEFAULTS.BLACK_KEY_HEIGHT);
    const [whiteKeyHeight, setWhiteKeyHeight] = useState(DEFAULTS.WHITE_KEY_HEIGHT);
    const [keyColorSubset, setKeyColorSubset] = useState(DEFAULTS.KEY_COLOR_SUBSET);
    const [onlyC, setOnlyC] = useState(DEFAULTS.ONLY_C);
    const [withOctaveNumbers, setWithOctaveNumbers] = useState(DEFAULTS.WITH_OCTAVE_NUMBERS);
    const [special, setSpecial] = useState(DEFAULTS.SPECIAL);

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
            alignItems: "center",
        }}
        >
        <ScrollView>
        <Text>Glissando</Text>
        <Switch
            value={glissandoOn}
            onValueChange={setGlissandoOn}
        />

        <Text>Key Lift Effect</Text>
        <Switch
            value={keyLiftOn}
            onValueChange={setKeyLiftOn}
        />

        <Text>Press Haptics</Text>
        <Switch
            value={pressHapticOn}
            onValueChange={setPressHapticOn}
        />

        <Text>Release Haptics</Text>
        <Switch
            value={releaseHapticOn}
            onValueChange={setReleaseHapticOn}
        />

        <Text>Press Haptic Strength</Text>
        <SegmentedControl
            values={hapticsStrengthOptions}
            selectedIndex={hapticsStrengthOptions.indexOf(hapticsStrength)}
            onChange={(event) => {
                const index = event.nativeEvent.selectedSegmentIndex;
                setHapticsStrength(hapticsStrengthOptions[index]);
            }}
        />

        <Text>Key Border Radius</Text>
        <NumericInput
            value={borderRadius}
            onChange={setBorderRadius}
            minValue={0}
            maxValue={20}
            step={1}
            textColor="black"
            rounded={Platform.OS !== "android"}
        />

        <Text>Key Border Width</Text>
        <NumericInput
            value={borderWidth}
            onChange={setBorderWidth}
            minValue={0}
            maxValue={10}
            step={1}
            textColor="black"
            rounded={Platform.OS !== "android"}
        />

        <Text>Disabled Key Border Width</Text>
        <NumericInput
            value={disabledBorderWidth}
            onChange={setDisabledBorderWidth}
            minValue={0}
            maxValue={10}
            step={1}
            textColor="black"
            rounded={Platform.OS !== "android"}
        />

        <Text>White Key Color</Text>
        <ColorPicker value={whiteKeyColor} onComplete={({ hex }) => setWhiteKeyColor(hex)}>
            <Preview/>
            <Panel1/>
            <HueSlider/>
        </ColorPicker>

        <Text>Black Key Color</Text>
        <ColorPicker value={blackKeyColor} onComplete={({ hex }) => setBlackKeyColor(hex)}>
            <Preview/>
            <Panel1/>
            <HueSlider/>
        </ColorPicker>

        <Text>Pressed Color</Text>
        <ColorPicker value={pressedColor} onComplete={({ hex }) => setPressedColor(hex)}>
            <Preview/>
            <Panel1/>
            <HueSlider/>
        </ColorPicker>

        <Text>Disabled Key Color</Text>
        <ColorPicker value={disabledKeyColor} onComplete={({ hex }) => setDisabledKeyColor(hex)}>
            <Preview/>
            <Panel1/>
            <HueSlider/>
        </ColorPicker>

        <Text>Border Color</Text>
        <ColorPicker value={borderColor} onComplete={({ hex }) => setBorderColor(hex)}>
            <Preview/>
            <Panel1/>
            <HueSlider/>
        </ColorPicker>

        <Text>Key Shrink: {keyShrinkPercent}%</Text>
        <NumericInput
            value={keyShrinkPercent}
            onChange={setKeyShrinkPercent}
            minValue={50}
            maxValue={100}
            step={5}
            rounded={Platform.OS !== "android"}
        />

        <Text>Black Key Height: {blackKeyHeight}%</Text>
        <NumericInput
            value={blackKeyHeight}
            onChange={setBlackKeyHeight}
            minValue={40}
            maxValue={100}
            step={5}
            rounded={Platform.OS !== "android"}
        />

        <Text>White Key Height: {whiteKeyHeight}%</Text>
        <NumericInput
            value={whiteKeyHeight}
            onChange={setWhiteKeyHeight}
            minValue={50}
            maxValue={100}
            step={5}
            rounded={Platform.OS !== "android"}
        />

        <Text>Key Label Mode: { special != "Unset"
            ? `${special}`
            : `For ${keyColorSubset.toLowerCase()} color keys, show ${onlyC ? "only C's" : "all notes"}
            ${withOctaveNumbers ? " with octave numbers" : " without octave numbers"}`
        }

        </Text>
        <Text>Applies to: {keyColorSubset.toLowerCase()} color keys</Text>
        <SegmentedControl
            values={["All", "White", "Black"]}
            selectedIndex={["All", "White", "Black"].indexOf(keyColorSubset)}
            onChange={(event) => {
                const index = event.nativeEvent.selectedSegmentIndex;
                setKeyColorSubset(["All", "White", "Black"][index]);
            }}
        />

        <Text>{onlyC ? "Applies only to C's" : "Applies to all notes"}</Text>
        <Switch
            value={onlyC}
            onValueChange={setOnlyC}
        />
        
        <Text>{withOctaveNumbers ? "Shows octave numbers" : "Doesn't show octave numbers"}</Text>
        <Switch
            value={withOctaveNumbers}
            onValueChange={setWithOctaveNumbers}
        />

        <Text>Special Options (overrides other settings)</Text>
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