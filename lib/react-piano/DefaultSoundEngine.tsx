import { Audio } from "expo-av";
import { InteractionManager } from "react-native";

const soundCache: Record<number, Audio.Sound | undefined> = {};
const loadingPromises: Record<number, Promise<Audio.Sound> | undefined> = {};
// Track which MIDI numbers we've already warned about to avoid spamming the log.
const warnedMissingAsset: Record<number, boolean> = {};

function midiToAsset(midi: number): any | null {
    // Map MIDI numbers to bundled assets here. Keep function small and explicit.
    switch (midi) {
        /*
        case 60:
            return require('../assets/piano-60.mp3');
        */
        default:
            return null;
    }
}

export async function playNote(midiNumber: number, volume: number = 1.0) {
    try {
        const cached = soundCache[midiNumber];
        if (cached) {
            await cached.replayAsync();
            return;
        }

        // Dedupe concurrent loads
        if (!loadingPromises[midiNumber]) {
            const asset = midiToAsset(midiNumber);
            if (!asset) {
                if (!warnedMissingAsset[midiNumber]) {
                    // eslint-disable-next-line no-console
                    console.warn(
                        `[DefaultSoundEngine] No sound asset for MIDI ${midiNumber}`
                    );
                    warnedMissingAsset[midiNumber] = true;
                }
                return;
            }
            loadingPromises[midiNumber] = (async () => {
                const { sound } = await Audio.Sound.createAsync(asset, {
                    shouldPlay: false,
                    volume,
                });
                soundCache[midiNumber] = sound;
                return sound;
            })();
        }

        const sound = await loadingPromises[midiNumber]!;
        // Ensure it plays from start
        try {
            await sound.replayAsync();
        } catch (err) {
            console.warn("[DefaultSoundEngine] replayAsync failed", err);
        }
        delete loadingPromises[midiNumber];
    } catch (error) {
        console.error(
            `[DefaultSoundEngine] Error playing note ${midiNumber}:`,
            error
        );
        delete loadingPromises[midiNumber];
    }
}
export async function unloadNote(midi: number) {
    // If a load is in progress, wait for it so we can unload the created sound.
    try {
        if (loadingPromises[midi]) {
            // eslint-disable-next-line no-await-in-loop
            await loadingPromises[midi];
        }
    } catch (err) {
        // ignore load errors when unloading
    }

    const sound = soundCache[midi];
    if (sound) {
        try {
            await sound.unloadAsync();
        } catch (err) {
            console.warn(
                `[DefaultSoundEngine] unloadNote: failed to unload MIDI ${midi}:`,
                err
            );
        }
        delete soundCache[midi];
    }

    // ensure we don't keep a stale loading promise
    delete loadingPromises[midi];
}

export async function stopNote(midi: number) {
    const sound = soundCache[midi];
    if (sound) {
        try {
            await sound.stopAsync();
        } catch (err) {
            console.warn(
                `[DefaultSoundEngine] stopNote: failed to stop MIDI ${midi}:`,
                err
            );
        }
    }
}

export async function unloadAll() {
    const keys = Object.keys(soundCache).map((k) => Number(k));
    for (const k of keys) {
        // eslint-disable-next-line no-await-in-loop
        await unloadNote(k);
    }
}

export async function unloadRange(first: number, last: number) {
    // Unload notes in the inclusive range [first, last]
    for (let midi = first; midi <= last; midi++) {
        // eslint-disable-next-line no-await-in-loop
        await unloadNote(midi);
    }
}

export function preloadNotes(midiNumbers: number[]) {
    // Returns a cancel handle: calling cancel() will prevent any further
    // preloads from starting and skip storing newly created sounds.
    let cancelled = false;

    // Schedule preload work after interactions to avoid blocking the JS/UI thread
    InteractionManager.runAfterInteractions(() => {
        (async () => {
            for (const midi of midiNumbers) {
                if (cancelled) break;
                try {
                    if (soundCache[midi]) continue;
                    if (!loadingPromises[midi]) {
                        const asset = midiToAsset(midi);
                        if (!asset) {
                            if (!warnedMissingAsset[midi]) {
                                // eslint-disable-next-line no-console
                                console.warn(
                                    `[DefaultSoundEngine] preloadNotes: no asset for MIDI ${midi}`
                                );
                                warnedMissingAsset[midi] = true;
                            }
                            continue;
                        }
                        loadingPromises[midi] = (async () => {
                            const { sound } = await Audio.Sound.createAsync(
                                asset,
                                { shouldPlay: false }
                            );
                            if (!cancelled) soundCache[midi] = sound;
                            delete loadingPromises[midi];
                            return sound;
                        })();
                    }
                    // await the load so we don't kick off too many parallel ops
                    // eslint-disable-next-line no-await-in-loop
                    await loadingPromises[midi];
                } catch (err) {
                    if (!cancelled)
                        console.warn(
                            `[DefaultSoundEngine] preloadNotes: failed to preload MIDI ${midi}:`,
                            err
                        );
                    delete loadingPromises[midi];
                }
            }
        })();
    });

    return {
        cancel: () => {
            cancelled = true;
        },
    };
}
