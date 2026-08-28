export const ACCESSIBILITY_SETTINGS_KEY = "voiceforge_accessibility_settings";

export const DEFAULT_ACCESSIBILITY_SETTINGS = {
  highContrast: false,
  largeText: false,
  reduceMotion: false,
  screenReaderOptimized: false,
};

export function loadAccessibilitySettings() {
  try {
    const raw = localStorage.getItem(ACCESSIBILITY_SETTINGS_KEY);
    if (!raw) return DEFAULT_ACCESSIBILITY_SETTINGS;
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_ACCESSIBILITY_SETTINGS, ...parsed };
  } catch {
    return DEFAULT_ACCESSIBILITY_SETTINGS;
  }
}

export function persistAccessibilitySettings(settings) {
  try {
    localStorage.setItem(ACCESSIBILITY_SETTINGS_KEY, JSON.stringify(settings));
  } catch (err) {
    console.warn("Failed to save accessibility settings:", err);
  }
}
