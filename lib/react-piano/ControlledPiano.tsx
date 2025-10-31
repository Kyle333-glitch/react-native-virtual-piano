import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import Keyboard from './Keyboard';

type ControlledPianoProps = {
  noteRange: { first: number; last: number };
  activeNotes: ReadonlyArray<number>;
  playNote: (midiNumber: number) => void;
  stopNote: (midiNumber: number) => void;
  onNoteOn: (midiNumber: number, prevActiveNotes: ReadonlyArray<number>) => void;
  onNoteOff: (midiNumber: number, prevActiveNotes: ReadonlyArray<number>) => void;
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
  noteRange, activeNotes, playNote, stopNote, onNoteOn, onNoteOff,
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

  const handleNoteOn = useCallback ((midiNumber: number) => {
    if (disabled) return;
    onNoteOn(midiNumber, activeNotes);
  }, [disabled, onNoteOn, activeNotes]
  );

  const handleNoteOff = useCallback ((midiNumber: number) => {
    if (disabled) return;
    onNoteOff(midiNumber, activeNotes);
  }, [disabled, onNoteOff, activeNotes]
  );

  const [isTouchDown, setIsTouchDown] = useState(false);

  const keyboardProps = useMemo(
  () => ({
    noteRange,
    onNoteOn: handleNoteOn,
    onNoteOff: handleNoteOff,
    activeNotes,
    disabled,
    width,
    keyWidthToHeight,
    gliss: isTouchDown,
    renderNoteLabel,
  }),
  [
    noteRange,
    handleNoteOn,
    handleNoteOff,
    activeNotes,
    disabled,
    width,
    keyWidthToHeight,
    isTouchDown,
    renderNoteLabel,
  ]
  );

  return (
    <View
      style={[styles.flex, style]}
      onTouchStart={() => setIsTouchDown(true)}
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