import React, { useCallback } from 'react';
import { Pressable, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import MidiNumbers from './MidiNumbers';

type PitchPositions = Record<string, number>;

type KeyProps = {
  midiNumber: number;
  naturalKeyWidth: number;
  gliss: boolean;
  useTouchEvents: boolean;
  accidental: boolean;
  active: boolean;
  disabled: boolean;
  onNoteOn: (midiNumber: number) => void;
  onNoteOff: (midiNumber: number) => void;
  accidentalWidthRatio?: number;
  pitchPositions?: PitchPositions;
  noteRange: { first: number; last: number };
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

const DEFAULT_PITCH_POSITIONS: PitchPositions = { 
  C: 0, Db: 0.55, D: 1, Eb: 1.8, E: 2, F: 3, Gb: 3.5, G: 4, Ab: 4.7, A: 5, Bb: 5.85, B: 6,
};

function Key({
  midiNumber, naturalKeyWidth, gliss, useTouchEvents, accidental, active, disabled,
  onNoteOn, onNoteOff, accidentalWidthRatio = 0.65, 
  pitchPositions = DEFAULT_PITCH_POSITIONS, noteRange, children, style,
}: KeyProps) {

  const handleNoteOn = useCallback(() => {
    if (!disabled) onNoteOn(midiNumber);
  }, [onNoteOn, midiNumber, disabled]);

  const handleNoteOff = useCallback(() => {
    if (!disabled) onNoteOff(midiNumber);
  }, [onNoteOff, midiNumber, disabled]);

  const getAbsoluteKeyPosition = (midiNumber: number) => {
    const OCTAVE_WIDTH = 7;
    const { octave, pitchName } = MidiNumbers.getAttributes(midiNumber);
    const pitchPosition = pitchPositions[pitchName];
    const octavePosition = OCTAVE_WIDTH * octave;
    return pitchPosition + octavePosition;
  };

  const getRelativeKeyPosition = (midiNumber: number) => 
    getAbsoluteKeyPosition(midiNumber) - getAbsoluteKeyPosition(noteRange.first);
    
  const left = getRelativeKeyPosition(midiNumber) * naturalKeyWidth;
  const width = (accidental ? accidentalWidthRatio : 1) * naturalKeyWidth;

  return (
    <Pressable
      style={({ pressed }) => [
        styles.key,
        accidental ? styles.accidental : styles.natural,
        (active ?? pressed) && styles.active, 
        disabled && styles.disabled, { left, width },
        style,
      ]}
      onPressIn={handleNoteOn}
      onPressOut={handleNoteOff}
      disabled={disabled}
    >
      <View style={styles.labelContainer}> {children} </View>  
    </Pressable>
  );
}

const styles = StyleSheet.create({
  key: {
    position: 'absolute',
    top: 0,
    bottom: 0,
  },
  natural: {
    backgroundColor: '#fff',
    borderColor: '#000',
    borderWidth: 1,
  },
  accidental: {
    backgroundColor: '#000',
    zIndex: 1, /// ensures black keys sit above white keys
  },
  active: {
    opacity: 0.7,
  },
  disabled: {
    opacity: 0.3,
  },
  labelContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

export default React.memo(Key);
