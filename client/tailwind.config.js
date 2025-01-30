/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0A192F",
        secondary: "#F97316",
        tertiry: "#54D6BB",
      },
    },
screens: {
  sm: { max: "1000px" }, // Small screens (up to 639px)
  lg: { max: "2023px" }, // Large screens (up to 2023px)
},

  },
  plugins: [],
};
