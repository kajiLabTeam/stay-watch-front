module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  content: [],
  theme: {
    extend: {},
    screens: {
      sm: "640px",
      md: "780px",
      lg: "1048px",
      xl: "1280px",
    },
  },
  plugins: [],
};
