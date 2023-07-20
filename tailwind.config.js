/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html"],
  theme: {
    screens: {
      sm: "480px",
      sm1: "680px",
      md: "780px",
      md1: "868px",
      lg: "976px",
      xl: "1440px",
    },
    fontFamily: {
      sans: ["Poppins", "sans-serif"],
      title: ["Coiny", "cursive"],
    },

    extend: {},
  },
  plugins: [],
};
