/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: "#00120b",
        light: "#f7f9f9",
        primary: "#266dd3",
        active: "#0cf574",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["dark", "light"],
  },
  darkMode: ["selector", '[data-theme="dark"]'],
};
