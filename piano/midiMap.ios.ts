// Static lookup object for all 88 piano keys (A0 → C8)
// MIDI 21 = A0 (lowest), MIDI 108 = C8 (highest)
// iOS-specific version: uses ALAC (.m4a) files

export const midiMap: Record<number, any> = {
    21: require('../assets/sounds/alac/note1.m4a'),     // A0
    22: require('../assets/sounds/alac/note2.m4a'),     // A#0 / Bb0
    23: require('../assets/sounds/alac/note3.m4a'),     // B0
    24: require('../assets/sounds/alac/note4.m4a'),     // C1
    25: require('../assets/sounds/alac/note5.m4a'),     // C#1 / Db1
    26: require('../assets/sounds/alac/note6.m4a'),     // D1
    27: require('../assets/sounds/alac/note7.m4a'),     // D#1 / Eb1
    28: require('../assets/sounds/alac/note8.m4a'),     // E1
    29: require('../assets/sounds/alac/note9.m4a'),     // F1
    30: require('../assets/sounds/alac/note10.m4a'),    // F#1 / Gb1
    31: require('../assets/sounds/alac/note11.m4a'),    // G1
    32: require('../assets/sounds/alac/note12.m4a'),    // G#1 / Ab1
    33: require('../assets/sounds/alac/note13.m4a'),    // A1
    34: require('../assets/sounds/alac/note14.m4a'),    // A#1 / Bb1
    35: require('../assets/sounds/alac/note15.m4a'),    // B1
    36: require('../assets/sounds/alac/note16.m4a'),    // C2
    37: require('../assets/sounds/alac/note17.m4a'),    // C#2 / Db2
    38: require('../assets/sounds/alac/note18.m4a'),    // D2
    39: require('../assets/sounds/alac/note19.m4a'),    // D#2 / Eb2
    40: require('../assets/sounds/alac/note20.m4a'),    // E2
    41: require('../assets/sounds/alac/note21.m4a'),    // F2
    42: require('../assets/sounds/alac/note22.m4a'),    // F#2 / Gb2
    43: require('../assets/sounds/alac/note23.m4a'),    // G2
    44: require('../assets/sounds/alac/note24.m4a'),    // G#2 / Ab2
    45: require('../assets/sounds/alac/note25.m4a'),    // A2
    46: require('../assets/sounds/alac/note26.m4a'),    // A#2 / Bb2
    47: require('../assets/sounds/alac/note27.m4a'),    // B2
    48: require('../assets/sounds/alac/note28.m4a'),    // C3
    49: require('../assets/sounds/alac/note29.m4a'),    // C#3 / Db3
    50: require('../assets/sounds/alac/note30.m4a'),    // D3
    51: require('../assets/sounds/alac/note31.m4a'),    // D#3 / Eb3
    52: require('../assets/sounds/alac/note32.m4a'),    // E3
    53: require('../assets/sounds/alac/note33.m4a'),    // F3
    54: require('../assets/sounds/alac/note34.m4a'),    // F#3 / Gb3
    55: require('../assets/sounds/alac/note35.m4a'),    // G3
    56: require('../assets/sounds/alac/note36.m4a'),    // G#3 / Ab3
    57: require('../assets/sounds/alac/note37.m4a'),    // A3
    58: require('../assets/sounds/alac/note38.m4a'),    // A#3 / Bb3
    59: require('../assets/sounds/alac/note39.m4a'),    // B3
    60: require('../assets/sounds/alac/note40.m4a'),    // C4 (Middle C)
    61: require('../assets/sounds/alac/note41.m4a'),    // C#4 / Db4
    62: require('../assets/sounds/alac/note42.m4a'),    // D4
    63: require('../assets/sounds/alac/note43.m4a'),    // D#4 / Eb4
    64: require('../assets/sounds/alac/note44.m4a'),    // E4
    65: require('../assets/sounds/alac/note45.m4a'),    // F4
    66: require('../assets/sounds/alac/note46.m4a'),    // F#4 / Gb4
    67: require('../assets/sounds/alac/note47.m4a'),    // G4
    68: require('../assets/sounds/alac/note48.m4a'),    // G#4 / Ab4
    69: require('../assets/sounds/alac/note49.m4a'),    // A4 (440 Hz)
    70: require('../assets/sounds/alac/note50.m4a'),    // A#4 / Bb4
    71: require('../assets/sounds/alac/note51.m4a'),    // B4
    72: require('../assets/sounds/alac/note52.m4a'),    // C5
    73: require('../assets/sounds/alac/note53.m4a'),    // C#5 / Db5
    74: require('../assets/sounds/alac/note54.m4a'),    // D5
    75: require('../assets/sounds/alac/note55.m4a'),    // D#5 / Eb5
    76: require('../assets/sounds/alac/note56.m4a'),    // E5
    77: require('../assets/sounds/alac/note57.m4a'),    // F5
    78: require('../assets/sounds/alac/note58.m4a'),    // F#5 / Gb5
    79: require('../assets/sounds/alac/note59.m4a'),    // G5
    80: require('../assets/sounds/alac/note60.m4a'),    // G#5 / Ab5
    81: require('../assets/sounds/alac/note61.m4a'),    // A5
    82: require('../assets/sounds/alac/note62.m4a'),    // A#5 / Bb5
    83: require('../assets/sounds/alac/note63.m4a'),    // B5
    84: require('../assets/sounds/alac/note64.m4a'),    // C6
    85: require('../assets/sounds/alac/note65.m4a'),    // C#6 / Db6
    86: require('../assets/sounds/alac/note66.m4a'),    // D6
    87: require('../assets/sounds/alac/note67.m4a'),    // D#6 / Eb6
    88: require('../assets/sounds/alac/note68.m4a'),    // E6
    89: require('../assets/sounds/alac/note69.m4a'),    // F6
    90: require('../assets/sounds/alac/note70.m4a'),    // F#6 / Gb6
    91: require('../assets/sounds/alac/note71.m4a'),    // G6
    92: require('../assets/sounds/alac/note72.m4a'),    // G#6 / Ab6
    93: require('../assets/sounds/alac/note73.m4a'),    // A6
    94: require('../assets/sounds/alac/note74.m4a'),    // A#6 / Bb6
    95: require('../assets/sounds/alac/note75.m4a'),    // B6
    96: require('../assets/sounds/alac/note76.m4a'),    // C7
    97: require('../assets/sounds/alac/note77.m4a'),    // C#7 / Db7
    98: require('../assets/sounds/alac/note78.m4a'),    // D7
    99: require('../assets/sounds/alac/note79.m4a'),    // D#7 / Eb7
    100: require('../assets/sounds/alac/note80.m4a'),   // E7
    101: require('../assets/sounds/alac/note81.m4a'),   // F7
    102: require('../assets/sounds/alac/note82.m4a'),   // F#7 / Gb7
    103: require('../assets/sounds/alac/note83.m4a'),   // G7
    104: require('../assets/sounds/alac/note84.m4a'),   // G#7 / Ab7
    105: require('../assets/sounds/alac/note85.m4a'),   // A7
    106: require('../assets/sounds/alac/note86.m4a'),   // A#7 / Bb7
    107: require('../assets/sounds/alac/note87.m4a'),   // B7
    108: require('../assets/sounds/alac/note88.m4a'),   // C8 (highest key)
};
