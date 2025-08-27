// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Your default font for the whole site
        sans: ["var(--font-geist-sans)"],
        // The special class for your new font
        neue: ["var(--font-neue-montreal)"],
      },
    },
  },
  plugins: [],
};