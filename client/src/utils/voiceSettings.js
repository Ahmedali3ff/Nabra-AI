export const VOICE_SETTINGS_KEY = "voiceforge_voice_settings";

export const DEFAULT_VOICE_SETTINGS = {
  stability: 0.75,
  temperature: 0.75,
  style: 0.0,
  dspPitch: 1.0,
  dspSpeed: 1.0,
  dspBass: 0.0,
  dspMid: 0.0,
  dspTreble: 0.0,
};

export const VOICE_PRESETS = {
  neutral: {
    name: "Narrator / Neutral",
    stability: 0.70,
    temperature: 0.60,
    style: 0.30,
    dspPitch: 1.0,
    dspSpeed: 1.0,
    dspBass: 0.0,
    dspMid: 0.0,
    dspTreble: 0.0,
  },
  excited: {
    name: "Excited / Energetic",
    stability: 0.40,
    temperature: 0.95,
    style: 0.75,
    dspPitch: 1.10,
    dspSpeed: 1.15,
    dspBass: -2.0,
    dspMid: 1.0,
    dspTreble: 4.0,
  },
  robotic: {
    name: "Robotic / Flat",
    stability: 0.95,
    temperature: 0.10,
    style: 0.05,
    dspPitch: 0.90,
    dspSpeed: 0.95,
    dspBass: 2.0,
    dspMid: -3.0,
    dspTreble: -2.0,
  },
  soft: {
    name: "Soft / Whispering",
    stability: 0.55,
    temperature: 0.50,
    style: 0.20,
    dspPitch: 1.05,
    dspSpeed: 0.85,
    dspBass: -4.0,
    dspMid: 2.0,
    dspTreble: 2.0,
  },
};

const BOUNDS = {
  stability: [0.0, 1.0],
  temperature: [0.0, 1.0],
  style: [0.0, 1.0],
  dspPitch: [0.5, 1.5],
  dspSpeed: [0.5, 2.0],
  dspBass: [-10.0, 10.0],
  dspMid: [-10.0, 10.0],
  dspTreble: [-10.0, 10.0],
};

function clamp(val, min, max) {
  return Math.min(max, Math.max(min, val));
}

export function loadVoiceSettings() {
  let parsed = {};
  try {
    const saved = localStorage.getItem(VOICE_SETTINGS_KEY);
    if (saved) {
      parsed = JSON.parse(saved) || {};
    }
  } catch (error) {
    console.warn('Failed to load voice settings:', error);
  }

  const result = {};
  for (const [key, defaultVal] of Object.entries(DEFAULT_VOICE_SETTINGS)) {
    if (typeof defaultVal === "number") {
      const coerced = parsed[key] == null ? NaN : Number(parsed[key]);
      if (Number.isNaN(coerced)) {
        result[key] = defaultVal;
      } else if (BOUNDS[key]) {
        result[key] = clamp(coerced, BOUNDS[key][0], BOUNDS[key][1]);
      } else {
        result[key] = coerced;
      }
    } else if (typeof defaultVal === "boolean") {
      result[key] = typeof parsed[key] === "boolean" ? parsed[key] : defaultVal;
    } else {
      result[key] =
        typeof parsed[key] === typeof defaultVal ? parsed[key] : defaultVal;
    }
  }
  return result;
}

export function persistVoiceSettings(settings) {
  try {
    localStorage.setItem(VOICE_SETTINGS_KEY, JSON.stringify(settings));
  } catch (error) {
    if (error?.name === "QuotaExceededError" || error?.code === 22) {
      console.warn("localStorage quota exceeded. Voice settings persisted for current session only.");
    } else {
      console.warn('Failed to save voice settings:', error);
    }
  }
}

export function resetVoiceSettings() {
  try {
    localStorage.removeItem(VOICE_SETTINGS_KEY);
  } catch (error) {
    console.warn('Failed to reset voice settings:', error);
  }
  return DEFAULT_VOICE_SETTINGS;
}
