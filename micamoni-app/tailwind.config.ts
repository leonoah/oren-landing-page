import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        yellow:  "#f4bb4f",
        teal:    "#298c9c",
        orange:  "#ea6c3a",
        dark:    "#1a1a2e",
        mid:     "#4a5568",
        light:   "#f8f9fb",
        border:  "#e8edf2",
      },
      fontFamily: {
        heebo: ["var(--font-heebo)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
