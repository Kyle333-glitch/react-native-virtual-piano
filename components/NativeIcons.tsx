import { Platform } from "react-native";
import { SymbolView, SFSymbol } from "expo-symbols";
// @ts-ignore
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
  person_add: "person.badge.plus",
  group: "person.2",
  notifications: "bell",
  notifications_off: "bell.slash",
  favorite: "heart",
  favorite_border: "heart",
  star: "star",
  lock: "lock",
  lock_open: "lock.open",
  visibility: "eye",
  visibility_off: "eye.slash",
  send: "paperplane",
  share: "square.and.arrow.up",
  download: "arrow.down.circle",
  upload: "arrow.up.circle",
  cloud: "cloud",
  cloud_download: "icloud.and.arrow.down",
  cloud_upload: "icloud.and.arrow.up",
  play_arrow: "play",
  pause: "pause",
  stop: "stop",
  skip_next: "forward.end",
  skip_previous: "backward.end",
  volume_up: "speaker.wave.3",
  volume_down: "speaker.wave.1",
  volume_mute: "speaker.slash",
  volume_off: "speaker.slash",
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
  music_note: "music.note",
  queue_music: "music.note.list",
  library_music: "music.quarternote.3",
  equalizer: "slider.horizontal.3",
  palette: "paintpalette",
  chevron_up: "chevron.up",
  chevron_down: "chevron.down",
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