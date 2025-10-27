import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
import Keyboard from './Keyboard';

type ControlledPianoProps = {
  noteRange: { first: number; last: number };
  activeNotes: number[];
  playNote: (midiNumber: number) => void;
  stopNote: (midiNumber: number) => void;
  onPlayNoteInput: (midiNumber: number, prevActiveNotes: number[]) => void;
  onStopNoteInput: (midiNumber: number, prevActiveNotes: number[]) => void;
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

export default function ControlledPiano({
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

  const renderLabel = useCallback(renderNoteLabel, [renderNoteLabel]);

  return (
    <View
      style={[{ flex: 1 }, style]}
      onTouchStart={() => { setUseTouchEvents(true); setIsTouchDown(true); }}
      onTouchEnd={() => setIsTouchDown(false)}
    >
      <Keyboard
        noteRange={noteRange}
        onPlayNoteInput={handlePlayNoteInput}
        onStopNoteInput={handleStopNoteInput}
        activeNotes={activeNotes}
        disabled={disabled}
        width={width}
        keyWidthToHeight={keyWidthToHeight}
        gliss={isTouchDown}
        useTouchEvents={useTouchEvents}
        renderNoteLabel={renderLabel}
      />
    </View>
  );
}