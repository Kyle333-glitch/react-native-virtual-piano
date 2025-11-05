import { Platform } from "react-native";
import { SymbolView, SFSymbol } from "expo-symbols";
import { MaterialIcons } from '@expo/vector-icons';

type NativeIconProps = {
    name: string;
    size?: number;
    color?: string;
    outline?: boolean;
};

const iosMap: Record<string, SFSymbol> = {
  home: "house",
  search: "magnifyingglass",
  settings: "gearshape",
  menu: "line.3.horizontal",
  person: "person",
  "person-add": "person.badge.plus",
  group: "person.2",
  notifications: "bell",
  "notifications-off": "bell.slash",
  favorite: "heart",
  "favorite-border": "heart",
  star: "star",
  lock: "lock",
  "lock-open": "lock.open",
  visibility: "eye",
  "visibility-off": "eye.slash",
  send: "paperplane",
  share: "square.and.arrow.up",
  download: "arrow.down.circle",
  upload: "arrow.up.circle",
  cloud: "cloud",
  "cloud-download": "icloud.and.arrow.down",
  "cloud-upload": "icloud.and.arrow.up",
  "play-arrow": "play",
  pause: "pause",
  stop: "stop",
  "skip-next": "forward.end",
  "skip-previous": "backward.end",
  "volume-up": "speaker.wave.3",
  "volume-down": "speaker.wave.1",
  "volume-mute": "speaker.slash",
  "volume-off": "speaker.slash",
  check: "checkmark",
  close: "xmark",
  add: "plus",
  remove: "minus",
  edit: "pencil",
  delete: "trash",
  info: "info.circle",
  help: "questionmark.circle",
  warning: "exclamationmark.triangle",
  error: "exclamationmark.octagon",
  piano: "pianokeys",
  "music-note": "music.note",
  "queue-music": "music.note.list",
  "library-music": "music.quarternote.3",
  equalizer: "slider.horizontal.3",
  palette: "paintpalette",
  "chevron-up": "chevron.up",
  "chevron-down": "chevron.down",
  success: "checkmark.circle",
  loading: "arrow.triangle.2.circlepath",
};

export default function NativeIcon({ name, size = 24, color = "black", outline = false }: NativeIconProps) {
    if (["ios", "macos", "visionos"].includes(Platform.OS)) {
        const base = iosMap[name] ?? "exclamationmark.triangle";
        const iosSymbolName = outline ? base : `${base}.fill`;
        return <SymbolView name={iosSymbolName as any} tintColor={color} style={{ width: size, height: size }}/>;
    }
    else {
        return <MaterialIcons name={name as any} size={size} color={color}/>;
    }
}