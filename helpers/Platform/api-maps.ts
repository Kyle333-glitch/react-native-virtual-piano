export const ANDROID_API_MAP: Record<number, number> = {
  36: 16,
  35: 15, // Google Play requires apps to target at least Android 15 (API level 35) 8/31/25
  34: 14,
  33: 13,
};

export const WINDOWS_API_CONTRACT_MAP: Record<number, { family: string; release: string }> = {
  13: { family: "Windows 10", release: "21H2" },       // November 2021 Update (last Win10 baseline)
  14: { family: "Windows 11", release: "22H2" },      // 2022 Update
  15: { family: "Windows 11", release: "23H2" },       // 2023 Update
  16: { family: "Windows 11", release: "24H2" },      // 2024 Update
  17: { family: "Windows 11", release: "24H2 (Servicing)" }, // Extended servicing baseline
  18: { family: "Windows 11", release: "24H2 (Servicing)" }, // Pre‑25H2 servicing
  19: { family: "Windows 11", release: "25H2" },     // 2025 Update
};

export const MACOS_VERSION_MAP: Record<number, string> = {
  11: "Big Sur",       // 2020
  12: "Monterey",      // 2021
  13: "Ventura",       // 2022
  14: "Sonoma",        // 2023
  15: "Sequoia",       // 2024
  26: "Tahoe"          // 2025
};
