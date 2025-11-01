const SORTED_PITCHES: string[] = [
    "C",
    "Db",
    "D",
    "Eb",
    "E",
    "F",
    "Gb",
    "G",
    "Ab",
    "A",
    "Bb",
    "B",
];
const ACCIDENTAL_PITCHES: string[] = ["Db", "Eb", "Gb", "Ab", "Bb"];
const PITCH_INDEXES: Record<string, number> = {
    C: 0,
    "C#": 1,
    Db: 1,
    D: 2,
    "D#": 3,
    Eb: 3,
    E: 4,
    F: 5,
    "F#": 6,
    Gb: 6,
    G: 7,
    "G#": 8,
    Ab: 8,
    A: 9,
    "A#": 10,
    Bb: 10,
    B: 11,
};
const MIDI_NUMBER_C0 = 12;
export const MIN_MIDI_NUMBER = MIDI_NUMBER_C0;
export const MAX_MIDI_NUMBER = 127;
const NOTE_REGEX = /([a-g])([#b]?)(\d+)/;
const NOTES_IN_OCTAVE = 12;

export type MidiNumberAttributes = {
    note: string;
    pitchName: string;
    octave: number;
    midiNumber: number;
    isAccidental: boolean;
};

function range(start: number, end: number, step = 1): number[] {
    const result: number[] = [];
    for (let i = start; i < end; i += step) {
        result.push(i);
    }
    return result;
}

export function fromNote(note: string): number {
    if (!note) {
        throw new Error("Invalid note argument: empty");
    }
    const match = NOTE_REGEX.exec(note.toLowerCase());
    if (!match) {
        throw new Error(`Invalid note argument: ${note}`);
    }
    const [, letter, accidental, octave] = match;
    const pitchName = `${letter.toUpperCase()}${accidental}`;
    const pitchIndex = PITCH_INDEXES[pitchName];
    if (pitchIndex == null) {
        throw new Error(`Invalid note argument: ${note}`);
    }
    return MIDI_NUMBER_C0 + pitchIndex + NOTES_IN_OCTAVE * parseInt(octave, 10);
}

function buildMidiNumberAttributes(midiNumber: number): MidiNumberAttributes {
    const pitchIndex = (midiNumber - MIDI_NUMBER_C0) % NOTES_IN_OCTAVE;
    const octave = Math.floor((midiNumber - MIDI_NUMBER_C0) / NOTES_IN_OCTAVE);
    const pitchName = SORTED_PITCHES[pitchIndex];
    return {
        note: `${pitchName}${octave}`,
        pitchName,
        octave,
        midiNumber,
        isAccidental: ACCIDENTAL_PITCHES.includes(pitchName),
    };
}

function buildMidiNumberAttributesCache(): Record<
    number,
    MidiNumberAttributes
> {
    return range(MIN_MIDI_NUMBER, MAX_MIDI_NUMBER + 1).reduce(
        (cache: Record<number, MidiNumberAttributes>, midiNumber) => {
            cache[midiNumber] = buildMidiNumberAttributes(midiNumber);
            return cache;
        },
        {} as Record<number, MidiNumberAttributes>
    );
}

const midiNumberAttributesCache = buildMidiNumberAttributesCache();

export function getAttributes(midiNumber: number): MidiNumberAttributes {
    const attrs = midiNumberAttributesCache[midiNumber];
    if (!attrs) {
        throw new Error(`Invalid MIDI number: ${midiNumber}`);
    }
    return attrs;
}

export const NATURAL_MIDI_NUMBERS: number[] = range(
    MIN_MIDI_NUMBER,
    MAX_MIDI_NUMBER + 1
).filter((midiNumber) => !getAttributes(midiNumber).isAccidental);

export default {
    fromNote,
    getAttributes,
    MIN_MIDI_NUMBER,
    MAX_MIDI_NUMBER,
    NATURAL_MIDI_NUMBERS,
};
