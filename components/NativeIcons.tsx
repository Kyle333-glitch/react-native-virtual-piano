import { Platform } from "react-native";
import { SymbolView } from "expo-symbols";
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

import type { ComponentProps } from "react";
import type { SFSymbol } from "expo-symbols";

type MaterialIconName = ComponentProps<typeof MaterialIcons>["name"];

export const iconNames = [
  "home", "search", "settings", "menu", "person", "person-add", "group", "notifications",
  "notifications-off", "favorite", "star", "lock", "lock-open", "visibility", "visibility-off", "send",
  "share", "download", "upload", "cloud", "cloud-download", "cloud-upload", "play-arrow", "pause", "stop", "skip-next", "skip-previous", "volume-up",
  "volume-down", "volume-mute", "volume-off", "checkmark", "close", "add", "remove", "edit", "delete",
  "info", "help", "warning", "error", "piano", "music-note", "queue-music", "library-music", "equalizer",
  "palette", "collapse", "expand", "success", "loading"
] as const; // keep as const for type safety

export type IconName = typeof iconNames[number];


type NativeIconProps = {
    name: IconName;
    size?: number;
    color?: string;
    outline?: boolean;
};

const androidMap: Record<IconName, MaterialIconName> = {
  home: "home",
  search: "search",
  settings: "settings",
  menu: "menu",
  person: "person",
  "person-add": "person-add",
  group: "group",
  notifications: "notifications",
  "notifications-off": "notifications-off",
  favorite: "favorite",
  star: "star",
  lock: "lock",
  "lock-open": "lock-open",
  visibility: "visibility",
  "visibility-off": "visibility-off",
  send: "send",
  share: "share",
  download: "download",
  upload: "upload",
  cloud: "cloud",
  "cloud-download": "cloud-download",
  "cloud-upload": "cloud-upload",
  "play-arrow": "play-arrow",
  pause: "pause",
  stop: "stop",
  "skip-next": "skip-next",
  "skip-previous": "skip-previous",
  "volume-up": "volume-up",
  "volume-down": "volume-down",
  "volume-mute": "volume-mute",
  "volume-off": "volume-off",
  checkmark: "check",
  close: "close",
  add: "add",
  remove: "remove",
  edit: "edit",
  delete: "delete",
  info: "info",
  help: "help",
  warning: "warning",
  error: "error",
  piano: "piano",
  "music-note": "music-note",
  "queue-music": "queue-music",
  "library-music": "library-music",
  equalizer: "equalizer",
  palette: "palette",
  collapse: "expand-less",
  expand: "expand-more",
  success: "check-circle",
  loading: "autorenew",
};

const iosMap: Record<IconName, SFSymbol> = {
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
  "volume-off": "speaker",
  checkmark: "checkmark",
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
  collapse: "chevron.up",
  expand: "chevron.down",
  success: "checkmark.circle",
  loading: "arrow.triangle.2.circlepath",
};

const aliasMap: Record<IconName, string[]> = {
  home: ["house"],
  search: ["magnifyingglass"],
  settings: ["gear", "cog", "gearshape"],
  menu: ["line.3.horizontal"],
  person: ["user", "account", "person"],
  "person-add": ["user-plus", "person.badge.plus"],
  group: ["users", "person.2"],
  notifications: ["bell"],
  "notifications-off": ["bell-slash"],
  favorite: ["heart"],
  star: ["star"],
  lock: ["lock"],
  "lock-open": ["unlock", "lock.open"],
  visibility: ["eye"],
  "visibility-off": ["eye-slash"],
  send: ["paperplane"],
  share: ["share", "square.and.arrow.up"],
  download: ["download", "arrow.down.circle"],
  upload: ["upload", "arrow.up.circle"],
  cloud: ["cloud"],
  "cloud-download": ["cloud-download", "icloud.and.arrow.down"],
  "cloud-upload": ["cloud-upload", "icloud.and.arrow.up"],
  "play-arrow": ["play"],
  pause: ["pause"],
  stop: ["stop"],
  "skip-next": ["forward", "forward.end"],
  "skip-previous": ["backward", "backward.end"],
  "volume-up": ["volume-up", "speaker.wave.3"],
  "volume-down": ["volume-down", "speaker.wave.1"],
  "volume-mute": ["mute", "speaker-slash"],
  "volume-off": ["speaker"],
  checkmark: ["check"],
  close: ["xmark"],
  add: ["plus"],
  remove: ["minus"],
  edit: ["pencil"],
  delete: ["trash"],
  info: ["info-circle"],
  help: ["question-circle"],
  warning: ["exclamation-triangle"],
  error: ["exclamation-octagon"],
  piano: ["pianokeys"],
  "music-note": ["music-note"],
  "queue-music": ["playlist", "music.note.list"],
  "library-music": ["music.quarternote.3"],
  equalizer: ["equalizer", "slider.horizontal.3"],
  palette: ["paintpalette"],
  collapse: ["chevron-up"],
  expand: ["chevron-down"],
  success: ["check-circle", "checkmark.circle"],
  loading: ["refresh", "arrow.triangle.2.circlepath"],
};

function isValidIconName(input: string): input is IconName {
  return (iconNames as readonly IconName[]).some((name) => name === input);
  // as readonly IconName[] ok here
}

function resolveIconName(input: string) {
  const normalized = input.replace(/-/g, "_"); // replace _ with -

  if (isValidIconName(normalized)) return normalized as IconName;

  const canonicalName = aliasMap[normalized as keyof typeof aliasMap]; //TODO: improve type safety here
  if (canonicalName) {
    console.warn(`Alias "${input}" used. Prefer canonical name "${canonicalName}".`)
    return canonicalName;
  };
  
  console.error(`Invalid icon name: ${input}`)
  return "warning";
}

export default function NativeIcon({ name, size = 24, color = "black", outline = false }: NativeIconProps) {
    const resolvedName = resolveIconName(name);

    if (Platform.OS === "ios" || Platform.OS === "macos") {
        const base = iosMap[resolvedName as IconName]; //TODO: improve type safety here
        const iosSymbolName = outline ? base : `${base}.fill`;
        return (
          <SymbolView
            name={iosSymbolName as any} //TODO: improve type safety here
            tintColor={color}
            style={{ width: size, height: size }}
          />
        );
    }
    else {
      if (outline) {
        return (
          <MaterialCommunityIcons
            name={`${resolvedName}` + "-outline" as any} //TODO: improve type safety here
            size={size}
            color={color}/>
        );
      }
      return <MaterialIcons name={resolvedName as any} size={size} color={color}/>; //TODO: improve type safety here
    }
}