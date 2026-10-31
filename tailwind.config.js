/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./privacy.html", "./terms.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Neutrals carry a slight blue bias so they sit with the accent.
        paper: "#FFFFFF",
        mist: "#F3F5F9",
        line: "#E1E5ED",
        muted: "#576074",
        ink: "#0F1217",
        char: { DEFAULT: "#15181E", 2: "#1D2129", line: "#2B303A", muted: "#9AA3B5" },
        // The one accent: electric blue. `signal` is the tint used for text on charcoal.
        volt: { DEFAULT: "#2150FF", hover: "#1A41D6", soft: "#E8EDFF" },
        signal: "#7D9BFF",
      },
      fontFamily: {
        display: ['"Archivo"', "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ['"Instrument Sans"', "ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      maxWidth: { page: "76rem" },
      keyframes: {
        travel: { "0%": { offsetDistance: "0%" }, "100%": { offsetDistance: "100%" } },
        rise: { "0%": { transform: "translateY(10px)", opacity: "0.001" }, "100%": { transform: "none", opacity: "1" } },
      },
      animation: { rise: "rise .7s cubic-bezier(.2,.7,.2,1) both" },
    },
  },
  plugins: [],
};
