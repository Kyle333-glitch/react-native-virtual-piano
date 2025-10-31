import MidiNumbers from './MidiNumbers';

export type NoteRange = { first: number; last: number } | [number, number] | { first: string; last: string } | [string, string];

export const isStringTuple = (x: NoteRange): x is [string, string] => 
    Array.isArray(x) && typeof x[0] === 'string' && typeof x[1] === 'string';

export const isNumberTuple = (x: NoteRange): x is [number, number] => 
    Array.isArray(x) && typeof x[0] === 'number' && typeof x[1] === 'number';

export const isStringObject = (x: NoteRange): x is { first: string; last: string } => 
    !Array.isArray(x) && typeof x.first === 'string' && typeof x.last === 'string';

export const isNumberObject = (x: NoteRange): x is { first: number; last: number } => 
    !Array.isArray(x) && typeof x.first === 'number' && typeof x.last === 'number';

export default function normalizeNoteRange(noteRange: NoteRange): { first: number, last: number } {
    if (isStringTuple(noteRange)) {
        const [a, b] = noteRange;
        return { first: MidiNumbers.fromNote(a), last: MidiNumbers.fromNote(b) };
    }
    if (isNumberTuple(noteRange)) {
        const [a, b] = noteRange;
        return { first: a, last: b };
    }
    if (isStringObject(noteRange)) {
        return {
        first: MidiNumbers.fromNote(noteRange.first),
        last: MidiNumbers.fromNote(noteRange.last),
        };
    }
    if (isNumberObject(noteRange)) {
        return { first: noteRange.first, last: noteRange.last };
    }
    
    throw new Error('Invalid noteRange format');
}