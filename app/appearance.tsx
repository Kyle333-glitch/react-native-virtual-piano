import Piano from "@/lib/react-piano/Piano";
import { DEFAULTS, headerStyles } from "@/lib/react-piano/styles";
import { Dimensions, Platform, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ColorPicker, {
    HueSlider,
    Panel1,
    Preview,
} from "reanimated-color-picker";
import Stepper from "../components/Stepper";
import usePersistentState from "../hooks/usePersistentState";

export default function Appearance() {
    const [borderRadius, setBorderRadius] = usePersistentState(
        "borderRadius",
        DEFAULTS.BORDER_RADIUS
    );
    const [borderWidth, setBorderWidth] = usePersistentState(
        "borderWidth",
        DEFAULTS.BORDER_WIDTH
    );
    const [disabledBorderWidth, setDisabledBorderWidth] = usePersistentState(
        "disabledBorderWidth",
        DEFAULTS.DISABLED_BORDER_WIDTH
    );

    const [whiteKeyColor, setWhiteKeyColor] = usePersistentState(
        "whiteKeyColor",
        DEFAULTS.WHITE_KEY_COLOR
    );
    const [blackKeyColor, setBlackKeyColor] = usePersistentState(
        "blackKeyColor",
        DEFAULTS.BLACK_KEY_COLOR
    );
    const [pressedColor, setPressedColor] = usePersistentState(
        "pressedColor",
        DEFAULTS.PRESSED_COLOR
    );
    const [disabledKeyColor, setDisabledKeyColor] = usePersistentState(
        "disabledKeyColor",
        DEFAULTS.DISABLED_KEY_COLOR
    );
    const [borderColor, setBorderColor] = usePersistentState(
        "borderColor",
        DEFAULTS.BORDER_COLOR
    );

    const [blackKeyHeight, setBlackKeyHeight] = usePersistentState(
        "blackKeyHeight",
        DEFAULTS.BLACK_KEY_HEIGHT
    );
    const [whiteKeyHeight, setWhiteKeyHeight] = usePersistentState(
        "whiteKeyHeight",
        DEFAULTS.WHITE_KEY_HEIGHT
    );

    const { width } = Dimensions.get("window");

    return (
        <SafeAreaView
            style={{
                flex: 1,
                padding: 16,
            }}
        >
            <ScrollView
                contentContainerStyle={{ padding: 16, paddingBottom: 120 }}
            >
                <Text style={headerStyles.mediumSectionHeader}>
                    Key Border Radius
                </Text>
                <Stepper
                    value={borderRadius}
                    onChange={setBorderRadius}
                    minValue={0}
                    maxValue={20}
                    step={1}
                    textColor="black"
                    rounded={Platform.OS !== "android"}
                />

                <Text style={headerStyles.mediumSectionHeader}>
                    Key Border Width
                </Text>
                <Stepper
                    value={borderWidth}
                    onChange={setBorderWidth}
                    minValue={0}
                    maxValue={10}
                    step={1}
                    textColor="black"
                    rounded={Platform.OS !== "android"}
                />

                <Text style={headerStyles.mediumSectionHeader}>
                    Disabled Key Border Width
                </Text>
                <Stepper
                    value={disabledBorderWidth}
                    onChange={setDisabledBorderWidth}
                    minValue={0}
                    maxValue={10}
                    step={1}
                    textColor="black"
                    rounded={Platform.OS !== "android"}
                />

                <Text style={headerStyles.mediumSectionHeader}>
                    White Key Color
                </Text>
                <ColorPicker
                    value={whiteKeyColor}
                    onComplete={({ hex }) => setWhiteKeyColor(hex)}
                    style={{ width: width / 6 }}
                >
                    <Preview />
                    <Panel1 />
                    <HueSlider />
                </ColorPicker>

                <Text style={headerStyles.mediumSectionHeader}>
                    Black Key Color
                </Text>
                <ColorPicker
                    value={blackKeyColor}
                    onComplete={({ hex }) => setBlackKeyColor(hex)}
                    style={{ width: width / 6 }}
                >
                    <Preview />
                    <Panel1 />
                    <HueSlider />
                </ColorPicker>

                <Text style={headerStyles.mediumSectionHeader}>
                    Pressed Color
                </Text>
                <ColorPicker
                    value={pressedColor}
                    onComplete={({ hex }) => setPressedColor(hex)}
                    style={{ width: width / 6 }}
                >
                    <Preview />
                    <Panel1 />
                    <HueSlider />
                </ColorPicker>

                <Text style={headerStyles.mediumSectionHeader}>
                    Disabled Key Color
                </Text>
                <ColorPicker
                    value={disabledKeyColor}
                    onComplete={({ hex }) => setDisabledKeyColor(hex)}
                    style={{ width: width / 6 }}
                >
                    <Preview />
                    <Panel1 />
                    <HueSlider />
                </ColorPicker>

                <Text style={headerStyles.mediumSectionHeader}>
                    Border Color
                </Text>
                <ColorPicker
                    value={borderColor}
                    onComplete={({ hex }) => setBorderColor(hex)}
                    style={{ width: width / 6 }}
                >
                    <Preview />
                    <Panel1 />
                    <HueSlider />
                </ColorPicker>

                <Text style={headerStyles.mediumSectionHeader}>
                    Black Key Height: {blackKeyHeight}%
                </Text>
                <Stepper
                    value={blackKeyHeight}
                    onChange={setBlackKeyHeight}
                    minValue={40}
                    maxValue={100}
                    step={5}
                    rounded={Platform.OS !== "android"}
                />

                <Text style={headerStyles.mediumSectionHeader}>
                    White Key Height: {whiteKeyHeight}%
                </Text>
                <Stepper
                    value={whiteKeyHeight}
                    onChange={setWhiteKeyHeight}
                    minValue={50}
                    maxValue={100}
                    step={5}
                    rounded={Platform.OS !== "android"}
                />
            </ScrollView>

            <View
                style={{
                    position: "absolute",
                    bottom: 24,
                    right: 24,
                    borderTopWidth: 1,
                    borderColor: "#ccc",
                    width: width / 2,
                    marginLeft: "auto",
                }}
            >
                <Text
                    style={[
                        headerStyles.sectionHeader,
                        { textAlign: "center" },
                    ]}
                >
                    Piano Preview
                </Text>
                <Text style={{ textAlign: "center", paddingBottom: 8 }}>
                    Tweak your appearance preferences and see the changes here.
                </Text>
                <Piano
                    noteRange={["c4", "c5"]}
                    //borderRadius={borderRadius}
                    borderWidth={borderWidth}
                    //disabledBorderWidth={disabledBorderWidth}
                    whiteKeyColor={whiteKeyColor}
                    blackKeyColor={blackKeyColor}
                    pressedColor={pressedColor}
                    //disabledKeyColor={disabledKeyColor}
                    borderColor={borderColor}
                    //blackKeyHeight={blackKeyHeight}
                    //whiteKeyHeight={whiteKeyHeight}
                />
            </View>
        </SafeAreaView>
    );
}
