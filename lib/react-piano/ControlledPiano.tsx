import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import Keyboard from './Keyboard';

type ControlledPianoProps = {
  noteRange: { first: number; last: number };
  activeNotes: ReadonlyArray<number>;
  playNote: (midiNumber: number) => void;
  stopNote: (midiNumber: number) => void;
  onPlayNoteInput: (midiNumber: number, prevActiveNotes: ReadonlyArray<number>) => void;
  onStopNoteInput: (midiNumber: number, prevActiveNotes: ReadonlyArray<number>) => void;
  renderNoteLabel?: (args: {
    midiNumber: number;
    isActive: boolean;
    isAccidental: boolean;
  }) => React.ReactNode;
  disabled?: boolean;
  width?: number;
  keyWidthToHeight?: number;
  style?: StyleProp<ViewStyle>;
};

function ControlledPiano({
  noteRange, activeNotes, playNote, stopNote, onPlayNoteInput, onStopNoteInput,
  renderNoteLabel = () => null, disabled, width, keyWidthToHeight, style,
}: ControlledPianoProps) {

  const prevActiveNotesRef = useRef(activeNotes);
  useEffect(() => {
    if (disabled) return;
    const prev = prevActiveNotesRef.current;
    const next = activeNotes;
    next.filter(n => !prev.includes(n)).forEach(playNote);
    prev.filter(n => !next.includes(n)).forEach(stopNote);
    prevActiveNotesRef.current = next;
  }, [activeNotes, disabled, playNote, stopNote]);

  const handlePlayNoteInput = useCallback ((midiNumber: number) => {
    if (disabled) return;
    onPlayNoteInput(midiNumber, activeNotes);
  }, [disabled, onPlayNoteInput, activeNotes]
  );

  const handleStopNoteInput = useCallback ((midiNumber: number) => {
    if (disabled) return;
    onStopNoteInput(midiNumber, activeNotes);
  }, [disabled, onStopNoteInput, activeNotes]
  );

  const [isTouchDown, setIsTouchDown] = useState(false);
  const [useTouchEvents, setUseTouchEvents] = useState(false);

  const keyboardProps = useMemo(
  () => ({
    noteRange,
    onPlayNoteInput: handlePlayNoteInput,
    onStopNoteInput: handleStopNoteInput,
    activeNotes,
    disabled,
    width,
    keyWidthToHeight,
    gliss: isTouchDown,
    useTouchEvents,
    renderNoteLabel,
  }),
  [
    noteRange,
    handlePlayNoteInput,
    handleStopNoteInput,
    activeNotes,
    disabled,
    width,
    keyWidthToHeight,
    isTouchDown,
    useTouchEvents,
    renderNoteLabel,
  ]
  );

  return (
    <View
      style={[styles.flex, style]}
      onTouchStart={() => { setUseTouchEvents(true); setIsTouchDown(true); }}
      onTouchEnd={() => setIsTouchDown(false)}
    >
      <Keyboard {...keyboardProps} />
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
});

export default React.memo(ControlledPiano);