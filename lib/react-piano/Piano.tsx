import React, { useCallback, useEffect, useMemo, useState } from "react";
import { StyleProp, ViewStyle } from "react-native";
import {
    playNote as defaultPlayNote,
    stopNote as defaultStopNote,
} from "./DefaultSoundEngine";

import ControlledPiano from "./ControlledPiano";
import { unloadRange } from "./DefaultSoundEngine";
import normalizeNoteRange, { NoteRange } from "./NormalizeNoteRange";
import { DEFAULTS } from "./styles";

type NoteContext = { prevActiveNotes: ReadonlyArray<number> };

type PianoProps = Omit<
    React.ComponentProps<typeof ControlledPiano>,
    | "activeNotes"
    | "onNoteOn"
    | "onNoteOff"
    | "playNote"
    | "stopNote"
    | "style"
    | "noteRange"
> & {
    activeNotes?: ReadonlyArray<number>;
    onNoteOn?: (midi: number, ctx: NoteContext) => void;
    onNoteOff?: (midi: number, ctx: NoteContext) => void;
    style?: StyleProp<ViewStyle>;
    noteRange: NoteRange;
    playNote?: (midi: number) => void;
    stopNote?: (midi: number) => void;
    /**
     * When true, automatically unloads preloaded sounds for this piano's range on unmount.
     * This helps mobile apps free native resources when navigating away from a screen.
     * Default: false
     */
    autoUnloadOnUnmount?: boolean;
    whiteKeyColor?: string;
    blackKeyColor?: string;
    borderWidth?: number;
    borderColor?: string;
    pressedColor?: string;
};

const Piano = ({
    activeNotes: controlledActiveNotes,
    onNoteOn,
    onNoteOff,
    playNote = defaultPlayNote,
    stopNote = defaultStopNote,
    noteRange,
    autoUnloadOnUnmount = true,
    whiteKeyColor = DEFAULTS.WHITE_KEY_COLOR,
    blackKeyColor = DEFAULTS.BLACK_KEY_COLOR,
    borderWidth = DEFAULTS.BORDER_WIDTH,
    borderColor = DEFAULTS.BORDER_COLOR,
    pressedColor = DEFAULTS.PRESSED_COLOR,
}: PianoProps) => {
    let normalizedNoteRange;
    try {
        normalizedNoteRange = normalizeNoteRange(noteRange);
    } catch (err) {
        // eslint-disable-next-line no-console
        console.error &&
            console.error(
                "[Piano] normalizeNoteRange failed for",
                noteRange,
                err
            ); // debug
        throw err;
    }

    const [internalActiveNotes, setInternalActiveNotes] = useState<
        ReadonlyArray<number>
    >(controlledActiveNotes ?? []);
    const internalActiveNotesRef =
        React.useRef<ReadonlyArray<number>>(internalActiveNotes);

    useEffect(() => {
        internalActiveNotesRef.current = internalActiveNotes;
    }, [internalActiveNotes]);

    function arraysEqual(a: ReadonlyArray<number>, b: ReadonlyArray<number>) {
        return a.length === b.length && a.every((val, i) => val === b[i]);
    }

    useEffect(() => {
        if (
            controlledActiveNotes !== undefined &&
            !arraysEqual(controlledActiveNotes, internalActiveNotes)
        ) {
            setInternalActiveNotes(controlledActiveNotes);
        }
    }, [controlledActiveNotes]);

    const handleNoteOn = useCallback(
        (midiNumber: number) => {
            setInternalActiveNotes((prev) => {
                if (controlledActiveNotes !== undefined) return prev;
                if (prev.includes(midiNumber)) return prev;
                return [...prev, midiNumber];
            });

            // Side-effects are executed after scheduling state update to avoid
            // running effects inside the state updater function.
            try {
                onNoteOn?.(midiNumber, {
                    prevActiveNotes: internalActiveNotesRef.current,
                });
            } catch (err) {
                // swallow consumer errors
            }
            try {
                playNote(midiNumber);
            } catch (_) {}
        },
        [onNoteOn, playNote, controlledActiveNotes]
    );

    const handleNoteOff = useCallback(
        (midiNumber: number) => {
            setInternalActiveNotes((prev) => {
                if (controlledActiveNotes !== undefined) return prev;
                return prev.filter((n) => n !== midiNumber);
            });

            try {
                onNoteOff?.(midiNumber, {
                    prevActiveNotes: internalActiveNotesRef.current,
                });
            } catch (err) {}
            try {
                stopNote(midiNumber);
            } catch (_) {}
        },
        [onNoteOff, stopNote, controlledActiveNotes]
    );

    const pianoProps = useMemo(
        () => ({
            activeNotes: internalActiveNotes,
            onNoteOn: handleNoteOn,
            onNoteOff: handleNoteOff,
            playNote,
            stopNote,
            noteRange: normalizedNoteRange,
            // pass-through for ControlledPiano if desired (not used internally)
            autoUnloadOnUnmount,
            whiteKeyColor,
            blackKeyColor,
            borderWidth,
            borderColor,
            pressedColor,
        }),
        [
            internalActiveNotes,
            handleNoteOn,
            handleNoteOff,
            playNote,
            stopNote,
            normalizedNoteRange,
            whiteKeyColor,
            blackKeyColor,
            borderWidth,
            borderColor,
            pressedColor,
        ]
    );

    // Unload audio resources on unmount if requested (mobile optimization).
    React.useEffect(() => {
        if (!autoUnloadOnUnmount) return;
        return () => {
            try {
                // Unload only this piano's note range to avoid evicting other app sounds
                unloadRange(
                    normalizedNoteRange.first,
                    normalizedNoteRange.last
                );
            } catch (err) {
                // swallow unload errors
                // eslint-disable-next-line no-console
                console.warn("[Piano] unloadRange failed:", err);
            }
        };
    }, [autoUnloadOnUnmount, normalizedNoteRange]);

    return <ControlledPiano {...pianoProps} />;
};

export default React.memo(Piano);
