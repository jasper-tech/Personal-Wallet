import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "blue-accent": {
          50: "var(--blue-accent-50)",
          100: "var(--blue-accent-100)",
          200: "var(--blue-accent-200)",
          300: "var(--blue-accent-300)",
          400: "var(--blue-accent-400)",
          500: "var(--blue-accent-500)",
          600: "var(--blue-accent-600)",
          700: "var(--blue-accent-700)",
        },
        "green-accent": {
          50: "var(--green-accent-50)",
          100: "var(--green-accent-100)",
          200: "var(--green-accent-200)",
          300: "var(--green-accent-300)",
          400: "var(--green-accent-400)",
          500: "var(--green-accent-500)",
          600: "var(--green-accent-600)",
          700: "var(--green-accent-700)",
        },
        "red-accent": {
          50: "var(--red-accent-50)",
          100: "var(--red-accent-100)",
          200: "var(--red-accent-200)",
          300: "var(--red-accent-300)",
          400: "var(--red-accent-400)",
          500: "var(--red-accent-500)",
          600: "var(--red-accent-600)",
          700: "var(--red-accent-700)",
        },
      },
    },
  },
  plugins: [],
};

export default config;
