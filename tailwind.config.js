/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./client/src/**/*.{js,ts,jsx,tsx}"],
  darkMode: ["class"],
  theme: {
    screens: {
      phone: "300px",
      ipad_mini: "505px",
      ipad: "720px",
      half_screen: "850px",
      monitor: "1200px",
    },
    extend: {
      colors: {
        backgroundFadeB: "var(--backgroundFadeB)",
        backgroundFadeM: "var(--backgroundFadeM)",
        backgroundFadeE: "var(--backgroundFadeE)",

        activeTab: "var(--activeTab)",
        componentBg: "var(--componentBg)",
        skillTileBg: "var(--skillTileBg)",
        logoBg: "var(--logoBg)",
        resumeBg: "var(--resumeBg)",

        opposite: "var(--opposite)",
        secondary: "var(--secondary)",
        tertiary: "var(--tertiary)",
        primary: "var(--primary)",
        nonActive: "var(--nonActive)",

        particleC: "var(--particleC)",

        border: "var(--border)",

        skillBr: "var(--skillBr)",
        cardBr: "var(--cardBr)",
        botBr: "var(--botBr)",

        resumeHov: "var(--resumeHov)",
        socialHov: "var(--socialHov)",
        hover: "var(--hover)",
      },
      animation: {
        "fade-in-up": "fadeInUp 0.6s ease-out forwards",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
