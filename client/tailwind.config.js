// Nabra AI design tokens — deep teal primary, warm amber accent, slate neutral.
// Extends the original VoiceForge config with Nabra AI brand layer.
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // ── Voxena brand ────────────────────────────────────────────────
        primary: {
          DEFAULT: "#0D9488",
          50:  "#F0FDFA",
          100: "#CCFBF1",
          200: "#99F6E4",
          300: "#5EEAD4",
          400: "#2DD4BF",
          500: "#14B8A6",
          600: "#0D9488",
          700: "#0F766E",
          800: "#115E59",
          900: "#134E4A",
        },
        accent: {
          DEFAULT: "#F59E0B",
          light:   "#FCD34D",
          dark:    "#D97706",
        },

        // ── Original VoiceForge tokens (preserved for existing components) ─
        ink:    "#16201d",
        moss:   "#3f5f4d",
        mint:   "#c9ead7",
        coral:  "#f26f63",
        amber:  "#f3bc51",
        cloud:  "#f6f8f5",

        // ── Dark mode surface tokens (preserved) ────────────────────────
        night:   "#000000",
        surface: "#080808",
        border:  "#242424",
        muted:   "#a3a3a3",
        glow:    "#22c55e",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
      },
      boxShadow: {
        soft:    "0 18px 60px rgba(22, 32, 29, 0.12)",
        "soft-dk": "0 18px 60px rgba(0, 0, 0, 0.45)",
      },
      animation: {
        "fade-in":    "fadeIn 0.4s ease-out both",
        "slide-up":   "slideUp 0.4s ease-out both",
        "slide-down": "slideDown 0.3s ease-out both",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0" },
          to:   { opacity: "1" },
        },
        slideUp: {
          from: { transform: "translateY(16px)", opacity: "0" },
          to:   { transform: "translateY(0)",    opacity: "1" },
        },
        slideDown: {
          from: { transform: "translateY(-8px)", opacity: "0" },
          to:   { transform: "translateY(0)",    opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
