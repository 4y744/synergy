/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: {
          50: "#fafafa",
          100: "#f5f5f5",
          200: "#e5e5e5",
          300: "#d4d4d4",
          400: "#a3a3a3",
          500: "#737373",
          600: "#525252",
          700: "#242424",
          800: "#1d1d1d",
          900: "#171717",
          950: "#121212",
        },
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif", "system-ui"],
      },
    },
  },
  plugins: [],
  darkMode: "selector",
};
