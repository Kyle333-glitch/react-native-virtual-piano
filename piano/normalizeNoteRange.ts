import MidiNumbers from "./midiNumbers";

export type NoteRange =
    | { first: number; last: number }
    | [number, number]
    | { first: string; last: string }
    | [string, string];

export const isStringTuple = (x: unknown): x is [string, string] =>
    Array.isArray(x) && typeof x[0] === "string" && typeof x[1] === "string";

export const isNumberTuple = (x: unknown): x is [number, number] =>
    Array.isArray(x) && typeof x[0] === "number" && typeof x[1] === "number";

export const isStringObject = (
    x: unknown
): x is { first: string; last: string } =>
    !Array.isArray(x) &&
    typeof x === "object" &&
    x !== null &&
    "first" in (x as object) &&
    "last" in (x as object) &&
    typeof (x as any).first === "string" &&
    typeof (x as any).last === "string";

export const isNumberObject = (
    x: unknown
): x is { first: number; last: number } =>
    !Array.isArray(x) &&
    typeof x === "object" &&
    x !== null &&
    "first" in (x as object) &&
    "last" in (x as object) &&
    typeof (x as any).first === "number" &&
    typeof (x as any).last === "number";

/**
 * Normalize a noteRange to numeric MIDI numbers.
 * Throws a descriptive Error for invalid shapes or values.
 */
export default function normalizeNoteRange(noteRange: NoteRange): {
    first: number;
    last: number;
} {
    try {
        // Lightweight debug info to help diagnose runtime prop shapes.
        try {
            // eslint-disable-next-line no-console
            console.debug &&
                console.debug("[normalizeNoteRange] received", noteRange); // debug
        } catch (_e) {
            /* ignore logging errors */
        }
        if (isStringTuple(noteRange)) {
            const [a, b] = noteRange;
            const aTrim = String(a).trim();
            const bTrim = String(b).trim();
            const first = MidiNumbers.fromNote(aTrim);
            const last = MidiNumbers.fromNote(bTrim);
            if (first > last)
                throw new Error(
                    `Invalid noteRange: first (${a}) > last (${b})`
                );
            return { first, last };
        }

        if (isNumberTuple(noteRange)) {
            const [a, b] = noteRange;
            if (!Number.isFinite(a) || !Number.isFinite(b))
                throw new Error("noteRange numbers must be finite");
            if (a > b) throw new Error("Invalid noteRange: first > last");
            return { first: a, last: b };
        }

        if (isStringObject(noteRange)) {
            const firstStr = String(noteRange.first).trim();
            const lastStr = String(noteRange.last).trim();
            const first = MidiNumbers.fromNote(firstStr);
            const last = MidiNumbers.fromNote(lastStr);
            if (first > last)
                throw new Error(
                    `Invalid noteRange: first (${noteRange.first}) > last (${noteRange.last})`
                );
            return { first, last };
        }

        if (isNumberObject(noteRange)) {
            const { first, last } = noteRange;
            if (!Number.isFinite(first) || !Number.isFinite(last))
                throw new Error("noteRange numbers must be finite");
            if (first > last)
                throw new Error("Invalid noteRange: first > last");
            return { first, last };
        }
    } catch (err) {
        // Log the raw value and error to assist developers at runtime.
        try {
            // eslint-disable-next-line no-console
            console.error &&
                console.error(
                    "[normalizeNoteRange] error parsing",
                    noteRange,
                    err
                ); // debug
        } catch (_e) {
            /* ignore logging issues */
        }
        // Re-throw with context to help callers identify bad input.
        // Include the original value to make runtime debugging easier.
        let pretty = "";
        try {
            pretty = JSON.stringify(noteRange);
        } catch (_e) {
            pretty = String(noteRange);
        }
        throw new Error(
            `normalizeNoteRange: invalid noteRange ${pretty}: ${String(
                err && (err as Error).message
            )}`
        );
    }

    throw new Error(
        "normalizeNoteRange: invalid noteRange format — expected tuple or object with first/last"
    );
}
