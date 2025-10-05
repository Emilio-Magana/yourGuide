/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/client/**/*.{js,ts,jsx,tsx}"],
  darkMode: ["class"],
  theme: {
    screens: {
      xs_window: "300px",
      s_window: "510px",
      m_window: "720px",
      l_window: "930px",
      xl_window: "1140px",
      xxl_window: "1350px",
    },
    extend: {
      colors: {
        mainBg: "var(--mainBg)",
        simBg: "var(--simBg)",
        headerBegBg: "var(--headerBegBg)",
        headerEndBg: "var(--headerEndBg)",

        opposite: "var(--opposite)",
        secondary: "var(--secondary)",
        tertiary: "var(--tertiary)",
        primary: "var(--primary)",
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
