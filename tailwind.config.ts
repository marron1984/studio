import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: "#fdf8ef",
          100: "#f9edd5",
          200: "#f2d8a8",
          300: "#e9bd72",
          400: "#e0a040",
          500: "#c4a265",
          600: "#b08840",
          700: "#926a34",
          800: "#775530",
          900: "#63472a",
        },
        navy: {
          50: "#f0f4f8",
          100: "#d9e2ec",
          200: "#bcccdc",
          300: "#9fb3c8",
          400: "#829ab1",
          500: "#627d98",
          600: "#486581",
          700: "#334e68",
          800: "#243b53",
          900: "#102a43",
          950: "#0a1929",
        },
      },
    },
  },
  plugins: [],
};

export default config;
