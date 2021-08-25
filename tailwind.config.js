module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ["Work Sans", "sans-serif"],
      },
      colors: {
        gray: {
          800: "#2E303F",
          900: "#262837",
        },
      },
      maxWidth: {
        content: "fit-content",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
