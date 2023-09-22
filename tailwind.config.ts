import type { Config } from "tailwindcss";
const colors = require("tailwindcss/colors");

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/layout/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/library/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xs: "30em", // > 480px
      sm: "38em", // > 608px
      md: "48em", // > 768px
      lg: "64em", // > 1024px
      xl: "80em", // > 1280px
    },
    colors: {
      transparent: "transparent",
      slate: colors.slate,
      black: colors.black,
      white: colors.white,
      primary: {
        light: "#a1b9ce",
        DEFAULT: "#155185",
        dark: "#134978",
      },
      secondary: {
        light: "#f8c4a1",
        DEFAULT: "#ED6C13",
        dark: "#d56111",
      },
      text: {
        DEFAULT: "#061828",
      },
    },
    fontFamily: {
      logo: ["var(--font-logo)"],
    },
  },
  plugins: [],
};
export default config;
