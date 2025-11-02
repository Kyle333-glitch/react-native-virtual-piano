import { Platform } from "react-native";
import { SymbolView, SFSymbol } from "expo-symbols";
// @ts-ignore
import MaterialSymbol from "react-native-material-symbols";

type NativeIconProps = {
    name: string;
    size?: number;
    color?: string;
    outline?: boolean;
};

const iosMap: Record<string, SFSymbol> = {
    settings: "gearshape",
    home: "house",
    search: "magnifyingglass",
};

export default function NativeIcon({ name, size = 24, color = "black", outline = false }: NativeIconProps) {
    if (Platform.OS === "ios") {
        const base = iosMap[name] ?? "exclamationmark.triangle";
        const iosSymbolName = outline ? base : `${base}.fill`;
        return <SymbolView name={iosSymbolName as any} tintColor={color} style={{ width: size, height: size }}/>;
    }
    else (Platform.OS === "android") {
        return <MaterialSymbol name={name} size={size} color={color} fill={outline ? 0 : 1}/>
    }
}