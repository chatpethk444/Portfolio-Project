/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "Sarabun", "sans-serif"],
        mono: ["Fira Code", "Courier New", "monospace"],
      },
    },
  },
  plugins: [],
};
