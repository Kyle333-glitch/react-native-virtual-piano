import { Platform } from "react-native";
import { SymbolView } from "expo-symbols";
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

import type { ComponentProps } from "react";
import type { SFSymbol } from "expo-symbols";

type MaterialIconName = ComponentProps<typeof MaterialIcons>["name"];

export const iconNames: string[] = [
  "home","search","settings","menu","close","check","add","remove","edit","delete",
  "info","help","warning","error","favorite","star","heart","user","user-add","user-remove",
  "users","account","profile","login","logout","lock","lock-open","key","privacy","visibility",
  "visibility-off","notifications","notifications-off","bell","calendar","calendar-today","calendar-event","clock","timer","alarm","stopwatch",
  "play","pause","stop","rewind","fast-forward","skip-next","skip-previous","shuffle","repeat","volume-up",
  "volume-down","volume-off","mute","camera","camera-front","camera-rear","photo","image","gallery","video",
  "video-call","microphone","microphone-off","record","mute-mic","upload","download","cloud","cloud-upload","cloud-download",
  "sync","sync-disabled","backup","restore","save","folder","folder-open","folder-add","folder-delete","file",
  "file-download","file-upload","file-text","file-pdf","file-zip","file-image","attachment","link","unlink","share",
  "share-android","share-ios","map","map-pin","map-marker","location","location-off","directions","navigation","compass",
  "gps","pin","route","road","traffic","transit","bus","train","tram","subway",
  "plane","flight","ship","car","taxi","bicycle","motorbike","parking","fuel","charging",
  "battery","battery-full","battery-half","battery-low","wifi","wifi-off","bluetooth","bluetooth-off","signal","airplane-mode",
  "cellular","hotspot","vpn","security","shield","shield-check","fingerprint","face-id","shopping-cart","shopping-bag",
  "store","tag","price-tag","sale","wallet","credit-card","receipt","cash","bank","currency-usd",
  "currency-eur","gift","camera-retake","crop","rotate","zoom-in","zoom-out","brightness","contrast","filter",
  "palette","brush","edit-undo","edit-redo","print","scanner","barcode","qr-code","microwave","fridge",
  "oven","kitchen","cutlery","restaurant","coffee","cup","beer","wine","utensils","home-alt",
  "apartment","building","garage","garden","lamp","light-on","light-off","thermostat","fan","air-conditioning",
  "heater","book","book-open","bookmark","bookmark-add","bookmark-remove","library","chapter","document","clipboard",
  "notes","text","type","code","code-block","terminal","console","bug","debug","merge",
  "branch","git","commit","pull-request","deploy","server","database","storage","chart-line","chart-bar",
  "pie-chart","analytics","dashboard","insights","trend-up","trend-down","currency","calculator","stats","report",
  "filter-list","sort","sort-asc","sort-desc","grid","list","view-module","view-list","zoom","fullscreen",
  "exit-fullscreen","minimize","maximize","expand","collapse","chevron-up","chevron-down","chevron-left","chevron-right","arrow-up",
  "arrow-down","arrow-left","arrow-right","arrow-back","arrow-forward","send","reply","reply-all","forward","inbox",
  "outbox","drafts","archive","trash","spam","mark-email-read","mark-email-unread","star-outline","flag","comment",
  "chat","chat-bubble","message","messages","sms","email","mail","envelope","paperplane","forum",
  "support","customer-service","headset","person","person-add","person-remove","group","group-add","group-remove","mentor",
  "badge","trophy","award","podium","medal","ribbon","play-circle","stop-circle","pause-circle","record-circle",
  "music-note","queue-music","library-music","playlist","radio","equalizer","volume-control","concert","microphone-stand","guitar",
  "piano","drum","violin","headphones","soundwave","audiotrack","voice","karaoke","camera-roll","slideshow",
  "presentation","movie","subtitles","closed-caption","caption","tv","desktop","laptop","tablet","phone",
  "watch","smartwatch","device-hub","usb","hdmi","monitor","projector","speaker","speaker-phone","earbuds",
  "remote","joystick","gamepad","trophy-star","achievement","heart-pulse","health","fitness","run","walk",
  "bicycle-mode","medication","doctor","hospital","first-aid","bandage","syringe","pill","dna","molecule",
  "leaf","eco","recycle","sun","moon","starry","cloudy","rain","snow","wind",
  "thermometer","umbrella","tornado","hurricane","alert","search-off","zoom-reset","pin-off","pin-add","pin-remove",
  "map-search","location-pin","near-me","nearby","distance","measure","ruler","scale","balance","weights",
  "fitness-center","gym","yoga","school","graduation-cap","certificate","bookmarks","lesson","teacher","student",
  "classroom","chalkboard","lab","experiment","lightbulb","idea","brain","puzzle","question","answer",
  "faq","checklist","task","task-add","task-complete","todo","reminder","note-add","schedule","event",
  "appointment","meeting","video-meeting","conference","broadcast","live","stream","podcast","rss","subscribe",
  "unsubscribe","followers","following","follow","unfollow","like","dislike","thumb-up","thumb-down","clap",
  "cheer","celebrate","share-social","mention","at-sign","hashtag","tag-outline","trending-up","trending-down","insights-overview",
  "layers","stack","folder-shared","folder-locked","folder-starred","bookmark-border","bookmark-heart","currency-pound","currency-yen","currency-inr",
  "currency-krw","wallet-travel","flight-takeoff","flight-land","place","attraction","tour","hotel","bed","spa",
  "pool","beach","camp","hiking","mountain","valley","island","map-outline","binoculars","eye-off",
  "eye-check","visibility-on","privacy-shield","lock-person","lock-person-open","admin","settings-advanced","tune","sliders","controls",
  "switch","toggle-on","toggle-off","radio-button-checked","radio-button-unchecked","checkbox-checked","checkbox-unchecked","badge-check","certificate-star","verified"
] as const; //keep as const for type safety

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
  const normalized = input.replace(/_/g, "-"); // replace _ with -

  if (isValidIconName(normalized)) return normalized as IconName;

  const found = Object.entries(aliasMap).find(([canonical, aliases]) =>
    aliases.includes(normalized)
  );

  if (found) {
    const [canonical] = found;
    console.warn(`Alias "${input}" used. Prefer canonical name "${canonical}".`)
    return canonical;
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