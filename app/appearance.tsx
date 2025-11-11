// © 2025 KYLE QUACH. ALL RIGHTS RESERVED.
// UNAUTHORIZED COPYING, DISTRIBUTION, MODIFICATION, OR USE OF THIS CODE, IN PART OR IN WHOLE, WITHOUT EXPRESS WRITTEN PERMISSION IS STRICTLY PROHIBITED.

import Piano from "@/piano/react-native-virtual-piano/Piano";
import {
    DEFAULTS,
    headerStyles,
} from "@/piano/react-native-virtual-piano/styles";
import { Dimensions, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ColorPicker from "../components/ColorPicker";
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

    const [disabledBorderColor, setDisabledBorderColor] = usePersistentState(
        "disabledBorderColor",
        DEFAULTS.DISABLED_BORDER_COLOR
    );

    const [keyShrinkPercent, setKeyShrinkPercent] = usePersistentState(
        "keyShrinkPercent",
        DEFAULTS.KEY_SHRINK_PERCENT
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
    const [whiteNoteLabelColor, setWhiteNoteLabelColor] = usePersistentState(
        "whiteNoteLabelColor",
        DEFAULTS.NOTE_LABEL_WHITE_COLOR
    );
    const [blackNoteLabelColor, setBlackNoteLabelColor] = usePersistentState(
        "blackNoteLabelColor",
        DEFAULTS.NOTE_LABEL_BLACK_COLOR
    );
    const [blackKeyHeight, setBlackKeyHeight] = usePersistentState(
        "blackKeyHeight",
        DEFAULTS.BLACK_KEY_HEIGHT
    );
    const [whiteKeyHeight, setWhiteKeyHeight] = usePersistentState(
        "whiteKeyHeight",
        DEFAULTS.WHITE_KEY_HEIGHT
    );
    const [pressDepth, setPressDepth] = usePersistentState(
        "pressDepth",
        DEFAULTS.PRESS_DEPTH
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
                />

                <Text style={headerStyles.mediumSectionHeader}>
                    Disabled Border Color
                </Text>
                <ColorPicker
                    defaultColor={disabledBorderColor}
                    onComplete={({ hex }) => setDisabledBorderColor(hex)}
                    style={{ width: width / 6 }}
                />

                <Text style={headerStyles.mediumSectionHeader}>
                    White Key Color
                </Text>
                <ColorPicker
                    defaultColor={whiteKeyColor}
                    onComplete={({ hex }) => setWhiteKeyColor(hex)}
                    style={{ width: width / 6 }}
                />

                <Text style={headerStyles.mediumSectionHeader}>
                    Black Key Color
                </Text>
                <ColorPicker
                    defaultColor={blackKeyColor}
                    onComplete={({ hex }) => setBlackKeyColor(hex)}
                    style={{ width: width / 6 }}
                />

                <Text style={headerStyles.mediumSectionHeader}>
                    Pressed Color
                </Text>
                <ColorPicker
                    defaultColor={pressedColor}
                    onComplete={({ hex }) => setPressedColor(hex)}
                    style={{ width: width / 6 }}
                />

                <Text style={headerStyles.mediumSectionHeader}>
                    Disabled Key Color
                </Text>
                <ColorPicker
                    defaultColor={disabledKeyColor}
                    onComplete={({ hex }) => setDisabledKeyColor(hex)}
                    style={{ width: width / 6 }}
                />

                <Text style={headerStyles.mediumSectionHeader}>
                    Border Color
                </Text>
                <ColorPicker
                    defaultColor={borderColor}
                    onComplete={({ hex }) => setBorderColor(hex)}
                    style={{ width: width / 6 }}
                />

                {/*
                <Text style={headerStyles.mediumSectionHeader}>
                    Black Key Note Label Color
                </Text>
                <ColorPicker
                    defaultColor={blackNoteLabelColor}
                    onComplete={({ hex }) => setBlackNoteLabelColor(hex)}
                    style={{ width: width / 6 }}
                />

                <Text style={headerStyles.mediumSectionHeader}>
                    White Key Note Label Color
                </Text>
                <ColorPicker
                    defaultColor={whiteNoteLabelColor}
                    onComplete={({ hex }) => setWhiteNoteLabelColor(hex)}
                    style={{ width: width / 6 }}
                />
                */}

                <Text style={headerStyles.mediumSectionHeader}>
                    Black Key Height: {blackKeyHeight}
                </Text>
                <Stepper
                    value={blackKeyHeight}
                    onChange={setBlackKeyHeight}
                    minValue={40}
                    maxValue={100}
                    step={5}
                />

                <Text style={headerStyles.mediumSectionHeader}>
                    White Key Height: {whiteKeyHeight}
                </Text>
                <Stepper
                    value={whiteKeyHeight}
                    onChange={setWhiteKeyHeight}
                    minValue={50}
                    maxValue={100}
                    step={5}
                />

                {/*
                <Text style={headerStyles.mediumSectionHeader}>
                    Press Key in Animation Depth
                </Text>
                <Stepper
                    value={pressDepth}
                    onChange={setPressDepth}
                    minValue={0}
                    maxValue={20}
                    step={1}
                />

                <Text style={headerStyles.mediumSectionHeader}>
                    Key Shrink Percent
                </Text>
                <Stepper
                    value={keyShrinkPercent}
                    onChange={setKeyShrinkPercent}
                    minValue={0}
                    maxValue={100}
                    step={5}
                />
                */}
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
                    disabledBorderWidth={disabledBorderWidth}
                    disabledBorderColor={disabledBorderColor}
                    disabledKeyColor={disabledKeyColor}
                    blackKeyHeight={blackKeyHeight}
                    whiteKeyHeight={whiteKeyHeight}
                    keyShrinkPercent={keyShrinkPercent}
                    pressDepth={pressDepth}
                    noteLabelWhiteColor={whiteNoteLabelColor}
                    noteLabelBlackColor={blackNoteLabelColor}
                />
            </View>
        </SafeAreaView>
    );
}
