import React, { useCallback, useState, useEffect, useMemo } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { playNote as defaultPlayNote, stopNote as defaultStopNote } from './DefaultSoundEngine';

import ControlledPiano from './ControlledPiano';

type NoteContext = { prevActiveNotes: ReadonlyArray<number> };

type PianoProps = Omit<
  React.ComponentProps<typeof ControlledPiano>,
  'activeNotes' | 'onNoteOn' | 'onNoteOff'
> & {
  activeNotes?: ReadonlyArray<number>;
  onNoteOn?: (midi: number, ctx: NoteContext) => void;
  onNoteOff?: (midi: number, ctx: NoteContext) => void;
  style?: StyleProp<ViewStyle>;
  noteRange: { first: number; last: number };
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
    noteRange,
  }), [internalActiveNotes, handleNoteOn, handleNoteOff, playNote, stopNote, noteRange]
  );

  return (
    <ControlledPiano {...pianoProps} />
  );
};

export default React.memo(Piano);
