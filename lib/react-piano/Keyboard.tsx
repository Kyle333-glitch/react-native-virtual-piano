import React, { useMemo } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import Key from './Key';
import MidiNumbers from './MidiNumbers';

type NoteRange = { first: number; last: number };

type KeyboardProps = {
  noteRange: NoteRange;
  activeNotes: ReadonlyArray<number>;
  onNoteOn: (midiNumber: number) => void;
  onNoteOff: (midiNumber: number) => void;
  renderNoteLabel?: (args: {
    midiNumber: number;
    isActive: boolean;
    isAccidental: boolean;
  }) => React.ReactNode;
  keyWidthToHeight?: number;
  disabled?: boolean;
  gliss?: boolean;
  useTouchEvents?: boolean;
  width?: number;
  style?: StyleProp<ViewStyle>;
}

const range = (start: number, end: number): number[] =>
    Array.from({ length: end - start + 1}, (_, i) => start + i);

function Keyboard({
  noteRange, activeNotes, onNoteOn, onNoteOff, renderNoteLabel = () => null,
  keyWidthToHeight = 0.33, disabled = false, gliss = false, useTouchEvents = false, width, style
}: KeyboardProps) {
  const midiNumbers: number[] = useMemo(() => range(noteRange.first, noteRange.last), [noteRange]);
  const naturalKeyCount = midiNumbers.filter((n) => !MidiNumbers.getAttributes(n).isAccidental).length;
  const naturalKeyWidth = 1 / naturalKeyCount;
  const containerWidth = width ?? '100%';
  const containerHeight = useMemo(() => {
    if (!width) return '100%';
    const keyWidth = width * naturalKeyWidth;
    return keyWidth / keyWidthToHeight;
  }, [width, naturalKeyWidth, keyWidthToHeight]);

  return (
    <View style={[styles.row, style, { width: containerWidth, height: containerHeight }]}>
      {midiNumbers.map((midiNumber) => {
        const { isAccidental } = MidiNumbers.getAttributes(midiNumber);
        const isActive = !disabled && activeNotes.includes(midiNumber);

        return (
          <Key 
            key={midiNumber} midiNumber={midiNumber} noteRange={noteRange} 
            naturalKeyWidth={naturalKeyWidth}  
            active={isActive} accidental={isAccidental} disabled={disabled} 
            onNoteOn={onNoteOn} onNoteOff={onNoteOff} 
            gliss={gliss} useTouchEvents={useTouchEvents}
          >
            {!disabled && renderNoteLabel({ isActive, isAccidental, midiNumber })}
          </Key>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row' },
});

export default React.memo(Keyboard);