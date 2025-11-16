// Static lookup object for all 88 piano keys (A0 → C8)
// MIDI 21 = A0 (lowest), MIDI 108 = C8 (highest)
// Default version: uses FLAC (.flac) files

export const midiMap: Record<number, any> = {
    21: require('../assets/sounds/flac/note1.flac'),    // A0
    22: require('../assets/sounds/flac/note2.flac'),    // A#0 / Bb0
    23: require('../assets/sounds/flac/note3.flac'),    // B0
    24: require('../assets/sounds/flac/note4.flac'),    // C1
    25: require('../assets/sounds/flac/note5.flac'),    // C#1 / Db1
    26: require('../assets/sounds/flac/note6.flac'),    // D1
    27: require('../assets/sounds/flac/note7.flac'),    // D#1 / Eb1
    28: require('../assets/sounds/flac/note8.flac'),    // E1
    29: require('../assets/sounds/flac/note9.flac'),    // F1
    30: require('../assets/sounds/flac/note10.flac'),   // F#1 / Gb1
    31: require('../assets/sounds/flac/note11.flac'),   // G1
    32: require('../assets/sounds/flac/note12.flac'),   // G#1 / Ab1
    33: require('../assets/sounds/flac/note13.flac'),   // A1
    34: require('../assets/sounds/flac/note14.flac'),   // A#1 / Bb1
    35: require('../assets/sounds/flac/note15.flac'),   // B1
    36: require('../assets/sounds/flac/note16.flac'),   // C2
    37: require('../assets/sounds/flac/note17.flac'),   // C#2 / Db2
    38: require('../assets/sounds/flac/note18.flac'),   // D2
    39: require('../assets/sounds/flac/note19.flac'),   // D#2 / Eb2
    40: require('../assets/sounds/flac/note20.flac'),   // E2
    41: require('../assets/sounds/flac/note21.flac'),   // F2
    42: require('../assets/sounds/flac/note22.flac'),   // F#2 / Gb2
    43: require('../assets/sounds/flac/note23.flac'),   // G2
    44: require('../assets/sounds/flac/note24.flac'),   // G#2 / Ab2
    45: require('../assets/sounds/flac/note25.flac'),   // A2
    46: require('../assets/sounds/flac/note26.flac'),   // A#2 / Bb2
    47: require('../assets/sounds/flac/note27.flac'),   // B2
    48: require('../assets/sounds/flac/note28.flac'),   // C3
    49: require('../assets/sounds/flac/note29.flac'),   // C#3 / Db3
    50: require('../assets/sounds/flac/note30.flac'),   // D3
    51: require('../assets/sounds/flac/note31.flac'),   // D#3 / Eb3
    52: require('../assets/sounds/flac/note32.flac'),   // E3
    53: require('../assets/sounds/flac/note33.flac'),   // F3
    54: require('../assets/sounds/flac/note34.flac'),   // F#3 / Gb3
    55: require('../assets/sounds/flac/note35.flac'),   // G3
    56: require('../assets/sounds/flac/note36.flac'),   // G#3 / Ab3
    57: require('../assets/sounds/flac/note37.flac'),   // A3
    58: require('../assets/sounds/flac/note38.flac'),   // A#3 / Bb3
    59: require('../assets/sounds/flac/note39.flac'),   // B3
    60: require('../assets/sounds/flac/note40.flac'),   // C4 (Middle C)
    61: require('../assets/sounds/flac/note41.flac'),   // C#4 / Db4
    62: require('../assets/sounds/flac/note42.flac'),   // D4
    63: require('../assets/sounds/flac/note43.flac'),   // D#4 / Eb4
    64: require('../assets/sounds/flac/note44.flac'),   // E4
    65: require('../assets/sounds/flac/note45.flac'),   // F4
    66: require('../assets/sounds/flac/note46.flac'),   // F#4 / Gb4
    67: require('../assets/sounds/flac/note47.flac'),   // G4
    68: require('../assets/sounds/flac/note48.flac'),   // G#4 / Ab4
    69: require('../assets/sounds/flac/note49.flac'),   // A4 (440 Hz)
    70: require('../assets/sounds/flac/note50.flac'),   // A#4 / Bb4
    71: require('../assets/sounds/flac/note51.flac'),   // B4
    72: require('../assets/sounds/flac/note52.flac'),   // C5
    73: require('../assets/sounds/flac/note53.flac'),   // C#5 / Db5
    74: require('../assets/sounds/flac/note54.flac'),   // D5
    75: require('../assets/sounds/flac/note55.flac'),   // D#5 / Eb5
    76: require('../assets/sounds/flac/note56.flac'),   // E5
    77: require('../assets/sounds/flac/note57.flac'),   // F5
    78: require('../assets/sounds/flac/note58.flac'),   // F#5 / Gb5
    79: require('../assets/sounds/flac/note59.flac'),   // G5
    80: require('../assets/sounds/flac/note60.flac'),   // G#5 / Ab5
    81: require('../assets/sounds/flac/note61.flac'),   // A5
    82: require('../assets/sounds/flac/note62.flac'),   // A#5 / Bb5
    83: require('../assets/sounds/flac/note63.flac'),   // B5
    84: require('../assets/sounds/flac/note64.flac'),   // C6
    85: require('../assets/sounds/flac/note65.flac'),   // C#6 / Db6
    86: require('../assets/sounds/flac/note66.flac'),   // D6
    87: require('../assets/sounds/flac/note67.flac'),   // D#6 / Eb6
    88: require('../assets/sounds/flac/note68.flac'),   // E6
    89: require('../assets/sounds/flac/note69.flac'),   // F6
    90: require('../assets/sounds/flac/note70.flac'),   // F#6 / Gb6
    91: require('../assets/sounds/flac/note71.flac'),   // G6
    92: require('../assets/sounds/flac/note72.flac'),   // G#6 / Ab6
    93: require('../assets/sounds/flac/note73.flac'),   // A6
    94: require('../assets/sounds/flac/note74.flac'),   // A#6 / Bb6
    95: require('../assets/sounds/flac/note75.flac'),   // B6
    96: require('../assets/sounds/flac/note76.flac'),   // C7
    97: require('../assets/sounds/flac/note77.flac'),   // C#7 / Db7
    98: require('../assets/sounds/flac/note78.flac'),   // D7
    99: require('../assets/sounds/flac/note79.flac'),   // D#7 / Eb7
    100: require('../assets/sounds/flac/note80.flac'),  // E7
    101: require('../assets/sounds/flac/note81.flac'),  // F7
    102: require('../assets/sounds/flac/note82.flac'),   // F#7 / Gb7
    103: require('../assets/sounds/flac/note83.flac'),   // G7
    104: require('../assets/sounds/flac/note84.flac'),   // G#7 / Ab7
    105: require('../assets/sounds/flac/note85.flac'),   // A7
    106: require('../assets/sounds/flac/note86.flac'),   // A#7 / Bb7
    107: require('../assets/sounds/flac/note87.flac'),   // B7
    108: require('../assets/sounds/flac/note88.flac'),   // C8 (highest key)
};