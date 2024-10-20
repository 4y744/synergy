/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: {
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
