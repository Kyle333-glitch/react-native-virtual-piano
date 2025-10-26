import React, { useCallback } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import ControlledPiano from './ControlledPiano';

type NoteContext = { prevActiveNotes: ReadonlyArray<number> };

type PianoProps = Omit<
  React.ComponentProps<typeof ControlledPiano>,
  'activeNotes' | 'onPlayNoteInput' | 'onStopNoteInput'
> & {
  activeNotes?: ReadonlyArray<number>;
  onNoteOn?: (midi: number, ctx: NoteContext) => void;
  onNoteOff?: (midi: number, ctx: NoteContext) => void;
  style?: StyleProp<ViewStyle>;
  // TO-DO: add other props want to support:
  // noteRange: { first: number; last: number };
  // playNote: (midi: number) => void;
  // stopNote: (midi: number) => void;
};

const Piano = ({
  activeNotes,
  onNoteOn,
  onNoteOff,
  ...otherProps
}: PianoProps) => {

  const handlePlayNoteInput = useCallback((midiNumber: number) => {
    onNoteOn?.(midiNumber, { prevActiveNotes: activeNotes?.slice() ?? [] })
  }, [onNoteOn, activeNotes]
  );

  const handleStopNoteInput = useCallback((midiNumber: number) => {
    onNoteOff?.(midiNumber, { prevActiveNotes: activeNotes?.slice() ?? [] })
    }, [onNoteOff, activeNotes]
  );

  return (
    <ControlledPiano
      activeNotes={activeNotes ?? []}
      onPlayNoteInput={handlePlayNoteInput}
      onStopNoteInput={handleStopNoteInput}
      {...otherProps}
    />
  );
};

export default React.memo(Piano);

//TODO: JSDoc focused on intent, usage, and edge cases
//keep in mind: to optimize memoization: Memoize derived values with useMemo, encourage stable props in parents
//keep in mind: rename PlayNoteInput and StopNoteInput things to onNoteOn/ onNoteOff completely when controlled piano is ready to accept that