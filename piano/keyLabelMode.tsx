export type KeyLabelMode = 
    | { type: "none" }
    | { type: "note"; onlyC?: boolean, withOctaveNumbers?: boolean; keyColor?: "All" | "White" | "Black" }
    | { type: "special"; value: "ActiveKeys" | "Solfege" | "OnlyDo" | "OnlyMiddleCDo" }

export function deriveKeyLabelMode(
    keyColorSubset: string,
    onlyC: boolean,
    withOctaveNumbers: boolean,
    special: string,
) {
    if (special && special !== "Unset" && special !== "None") {
        return { type: "special", value: special };
    }
    if (special === "None") {
        return { type: "none" };
    }
    return {
        type: "note",
        onlyC,
        withOctaveNumbers,
        subset: keyColorSubset as "All" | "White" | "Black",
    };
}

export function getKeyLabel(midi: number, mode: KeyLabelMode) {
    const NOTE_NAMES = ["C","C♯","D","D♯","E","F","F♯","G","G♯","A","A♯","B"];
    const name = NOTE_NAMES[midi % 12];
    const octave = Math.floor(midi / 12) - 1;

    if (mode.type === "none") return null;
    if (mode.type === "note") {
        if (mode.onlyC && name !== "C") return null;
    }
    if (mode.type === "special") {
        switch (mode.value) {
            case "Solfege":
                return ["Do","Di","Re","Ri","Mi","Fa","Fi","So","Si","La","Li","Ti"][midi % 12];
            case "ActiveKeys":
                return "FIXME";
            case "OnlyDo":
                return name === "C" ? "Do" : null;
            case "OnlyMiddleCDo":
                return midi === 60 ? "Do" : null;
        }
    }
    return null;
}