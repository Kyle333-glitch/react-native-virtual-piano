import { midiMap as flacMap } from './midiMap';
import { midiMap as alacMap } from './midiMap.ios';

function isSafari(): boolean {
    const ua = navigator.userAgent.toLowerCase();
    return ua.includes('safari') && !ua.includes('chrome');
}

export const midiMap = isSafari() ? alacMap : flacMap;

// ALAC is strictly Safari-only, while FLAC is universal everywhere except Safari.