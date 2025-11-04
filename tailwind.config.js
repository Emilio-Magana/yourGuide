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
        highLightBg: "var(--highLightBg)",
        simBg: "var(--simBg)",
        headerBegBg: "var(--headerBegBg)",
        headerEndBg: "var(--headerEndBg)",
        centerLBg: "var(--centerLBg)",
        mainBg: "var(--mainBg)",
        loaderBg1: "var(--loaderBg1)",
        loaderBg2: "var(--loaderBg2)",

        header: "var(--header)",
        headerOpposite: "var(--headerOpposite)",
        primary: "var(--primary)",
        opposite: "var(--opposite)",
        tertiary: "var(--tertiary)",
        secondary: "var(--secondary)",
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
