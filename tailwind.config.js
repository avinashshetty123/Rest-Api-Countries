/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode:'class',
  content: ["./index.html", "./Countries.html","./RestApi.js","./CountriesApi.js"], // Paths should be separate
  theme: {
    extend: {},
    animation: {
      shimmer: "shimmer 1.5s infinite ease-in-out",
    },
    keyframes: {
      shimmer: {
        "0%": { left: "-100%" },
        "100%": { left: "100%" },
      },
    },
  },
  plugins: [],
}
