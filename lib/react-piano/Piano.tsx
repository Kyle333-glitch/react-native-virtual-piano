import React from 'react';
import ControlledPiano from './ControlledPiano';

type PianoProps = {
  activeNotes?: ReadonlyArray<number>;
  onPlayNoteInput?: (midi: number, ctx: { prevActiveNotes: number[] }) => void;
  onStopNoteInput?: (midi: number, ctx: { prevActiveNotes: number[] }) => void;
  // add other props want to support:
  // noteRange: { first: number; last: number };
  // playNote: (midi: number) => void;
  // stopNote: (midi: number) => void;
  // style?: StyleProp<ViewStyle>;
};

type PianoState = {
  activeNotes: number[];
};

class Piano extends React.Component<PianoProps, PianoState> {

  state: PianoState = {
    activeNotes: [...(this.props.activeNotes ?? [])],
  };

  componentDidUpdate(prevProps: PianoProps) {
    // Make activeNotes "controllable" by using internal
    // state by default, but allowing prop overrides.
    if (
      prevProps.activeNotes !== this.props.activeNotes &&
      this.state.activeNotes !== this.props.activeNotes
    ) {
      this.setState({
        activeNotes: [...(this.props.activeNotes ?? [])],
      });
    }
  }

  handlePlayNoteInput = (midiNumber: number) => {
    this.setState((prevState) => {
      // Need to be handled inside setState in order to set prevActiveNotes without
      // race conditions.
      if (this.props.onPlayNoteInput) {
        this.props.onPlayNoteInput(midiNumber, { prevActiveNotes: prevState.activeNotes });
      }

      // Don't append note to activeNotes if it's already present
      if (prevState.activeNotes.includes(midiNumber)) {
        return null;
      }
      return {
        activeNotes: prevState.activeNotes.concat(midiNumber),
      };
    });
  };

  handleStopNoteInput = (midiNumber: number) => {
    this.setState((prevState) => {
      // Need to be handled inside setState in order to set prevActiveNotes without
      // race conditions.
      if (this.props.onStopNoteInput) {
        this.props.onStopNoteInput(midiNumber, { prevActiveNotes: prevState.activeNotes });
      }
      return {
        activeNotes: prevState.activeNotes.filter((note) => midiNumber !== note),
      };
    });
  };

  render() {
    const { activeNotes, onPlayNoteInput, onStopNoteInput, ...otherProps } = this.props;
    return (
      <ControlledPiano
        activeNotes={this.state.activeNotes}
        onPlayNoteInput={this.handlePlayNoteInput}
        onStopNoteInput={this.handleStopNoteInput}
        {...otherProps}
      />
    );
  }
}

export default Piano;