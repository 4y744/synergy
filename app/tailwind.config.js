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
          700: "#1f1f1f",
          800: "#1a1a1a",
          900: "#161616",
          950: "#131313",
        },
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif", "system-ui"],
      },
      transitionProperty: {
        bg: "background",
        w: "width",
        h: "height",
        m: "margin",
        p: "padding",
        text: "color, font-size",
        link: "background, color",
        button: "background, color",
        outline: "outline",
      },
    },
  },
  plugins: [],
  darkMode: "selector",
};
