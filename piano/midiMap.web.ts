import { flacMap } from "./midiMap.flac";
import { alacMap } from "./midiMap.alac";

function isSafari(): boolean {
    const ua = navigator.userAgent.toLowerCase();
    return ua.includes("safari") && !ua.includes("chrome");
}

export const midiMap = isSafari() ? alacMap : flacMap;

// ALAC is strictly Safari-only, while FLAC is universal everywhere except Safari.
