import React, { useCallback, useState, useEffect, useMemo } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { playNote as defaultPlayNote, stopNote as defaultStopNote } from './DefaultSoundEngine';

import ControlledPiano from './ControlledPiano';
import MidiNumbers from './MidiNumbers';

type NoteContext = { prevActiveNotes: ReadonlyArray<number> };
type NoteRange = { first: number; last: number } | [number, number] | { first: string; last: string } | [string, string];

type PianoProps = Omit<
  React.ComponentProps<typeof ControlledPiano>,
  'activeNotes' | 'onNoteOn' | 'onNoteOff' | 'playNote' | 'stopNote' | 'style'
> & {
  activeNotes?: ReadonlyArray<number>;
  onNoteOn?: (midi: number, ctx: NoteContext) => void;
  onNoteOff?: (midi: number, ctx: NoteContext) => void;
  style?: StyleProp<ViewStyle>;
  noteRange: NoteRange;
  playNote?: (midi: number) => void;
  stopNote?: (midi: number) => void;
};

const Piano = ({
  activeNotes: controlledActiveNotes,
  onNoteOn,
  onNoteOff,
  playNote = defaultPlayNote,
  stopNote = defaultStopNote,
  noteRange,
}: PianoProps) => {

  const normalizedNoteRange = (() => {
    if (Array.isArray(noteRange)) {
      return typeof noteRange[0] === 'string'
        ? { first: MidiNumbers.fromNote(noteRange[0]), last: MidiNumbers.fromNote(noteRange[1]) }
        : { first: noteRange[0], last: noteRange[1] };
    } else {
      return typeof noteRange.first === 'string'
        ? { first: MidiNumbers.fromNote(noteRange.first), last: MidiNumbers.fromNote(noteRange.last) }
        : noteRange;
    }
  })();

  const [internalActiveNotes, setInternalActiveNotes] = useState<ReadonlyArray<number>>(controlledActiveNotes ?? []);

  function arraysEqual(a: ReadonlyArray<number>, b: ReadonlyArray<number>) {
    return a.length === b.length && a.every((val, i) => val === b[i]);
  }

  useEffect(() => {
    if (controlledActiveNotes !== undefined && !arraysEqual(controlledActiveNotes, internalActiveNotes)) {
      setInternalActiveNotes(controlledActiveNotes);
    }
  }, [controlledActiveNotes]);

  const handleNoteOn = useCallback((midiNumber: number) => {
    setInternalActiveNotes(prev => {
      onNoteOn?.(midiNumber, {prevActiveNotes: prev});
      playNote(midiNumber);
      if (controlledActiveNotes !== undefined) return prev;
      if (prev.includes(midiNumber)) return prev;
      return [...prev, midiNumber];
    });
  }, [onNoteOn, playNote, controlledActiveNotes]
  );

  const handleNoteOff = useCallback((midiNumber: number) => {
    setInternalActiveNotes(prev => {
      onNoteOff?.(midiNumber, {prevActiveNotes: prev});
      stopNote(midiNumber);
      if (controlledActiveNotes !== undefined) return prev;
      return prev.filter(n => n !== midiNumber);
    });
    }, [onNoteOff, stopNote, controlledActiveNotes]
  );

  const pianoProps = useMemo(() => ({
    activeNotes: internalActiveNotes,
    onNoteOn: handleNoteOn,
    onNoteOff: handleNoteOff,
    playNote,
    stopNote,
    noteRange: normalizedNoteRange,
  }), [internalActiveNotes, handleNoteOn, handleNoteOff, playNote, stopNote, normalizedNoteRange]
  );

  return (
    <ControlledPiano {...pianoProps} />
  );
};

export default React.memo(Piano);
