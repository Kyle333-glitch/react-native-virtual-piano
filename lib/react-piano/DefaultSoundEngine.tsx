import { Audio } from 'expo-av';

const soundCache: Record<number, Audio.Sound> = {};

function midiToAsset(midi: number): any {
    switch (midi) {
        /*
        case 60:
            return require('../assets/piano-60.mp3');
        */
       default:
        return null;
    }
}

export async function playNote(midiNumber: number) {
    try {
        if (soundCache[midiNumber]) {
            await soundCache[midiNumber].replayAsync();
            return;
        }

        const asset = midiToAsset(midiNumber);
        if (!asset) {
            console.warn(`No sound asset found for MIDI number ${midiNumber}`);
            return;
        }

        const { sound } = await Audio.Sound.createAsync(asset, {
            shouldPlay: true,
            volume: 1.0,
        });

        soundCache[midiNumber] = sound;
    } catch (error) {
        console.error(`Error playing note ${midiNumber}:`, error);
    }
}

export async function stopNote(midiNumber: number) {
    try {
        const sound = soundCache[midiNumber];

        if (sound) {
            await sound.stopAsync();
        }
    } catch (error) {
        console.error(`Error playing note ${midiNumber}:`, error);
    }
}

export async function preloadNotes(midiNumbers: number[]) {
  for (const midi of midiNumbers) {
    const asset = midiToAsset(midi);
    if (asset && !soundCache[midi]) {
      const { sound } = await Audio.Sound.createAsync(asset);
      soundCache[midi] = sound;
    }
  }
}
