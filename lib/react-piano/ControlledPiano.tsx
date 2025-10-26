import React from 'react';
import { View, StyleSheet, GestureResponderEvent, StyleProp, ViewStyle } from 'react-native';
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

type ControlledPianoState = {
  isTouchDown: boolean;
  useTouchEvents: boolean;
};

class ControlledPiano extends React.Component <ControlledPianoProps, ControlledPianoState>{

  static defaultProps = {
    renderNoteLabel: () => null,
  };

  componentDidUpdate(prevProps: ControlledPianoProps) {
    if (this.props.activeNotes !== prevProps.activeNotes) {
      this.handleNoteChanges({
        prevActiveNotes: prevProps.activeNotes || [],
        nextActiveNotes: this.props.activeNotes || [],
      });
    }
  }

  handleNoteChanges = ({ prevActiveNotes, nextActiveNotes }: { prevActiveNotes: number[]; nextActiveNotes: number[]}): void => {
    if (this.props.disabled) {
      return;
    }
    const notesStopped = prevActiveNotes.filter(n => !nextActiveNotes.includes(n));
    const notesStarted = nextActiveNotes.filter(n => !prevActiveNotes.includes(n));
    notesStarted.forEach((midiNumber: number) => {
      this.props.playNote(midiNumber);
    });
    notesStopped.forEach((midiNumber: number) => {
      this.props.stopNote(midiNumber);
    });
  };

  onPlayNoteInput = (midiNumber: number) => {
    if (this.props.disabled) {
      return;
    }
    // Pass in previous activeNotes for recording functionality
    this.props.onPlayNoteInput(midiNumber, this.props.activeNotes);
  };

  onStopNoteInput = (midiNumber: number) => {
    if (this.props.disabled) {
      return;
    }
    // Pass in previous activeNotes for recording functionality
    this.props.onStopNoteInput(midiNumber, this.props.activeNotes);
  };

  onTouchStart = (_e: GestureResponderEvent) => {
    this.setState({
      useTouchEvents: true,
      isTouchDown: true,
    });
  };

  onTouchEnd = (_e: GestureResponderEvent) => {
    this.setState({ isTouchDown: false });
  };

  renderNoteLabel = ({ midiNumber, isActive, isAccidental }: { midiNumber: number; isActive: boolean; isAccidental: boolean }):
  React.ReactNode => {
    return this.props.renderNoteLabel?.({ midiNumber, isActive, isAccidental });
  };

  render() {
    return (
      <View
        style={[styles.container, this.props.style]}
        onTouchStart={this.onTouchStart}
        onTouchEnd={this.onTouchEnd}
      >
        <Keyboard
          noteRange={this.props.noteRange}
          onPlayNoteInput={this.onPlayNoteInput}
          onStopNoteInput={this.onStopNoteInput}
          activeNotes={this.props.activeNotes}
          disabled={this.props.disabled}
          width={this.props.width}
          keyWidthToHeight={this.props.keyWidthToHeight}
          gliss={this.state.isTouchDown}
          useTouchEvents={this.state.useTouchEvents}
          renderNoteLabel={this.renderNoteLabel}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default ControlledPiano;

//TODO: make more idiomatic