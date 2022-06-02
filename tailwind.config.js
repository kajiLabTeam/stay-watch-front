module.exports = {
  mode: "jit",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      sm: "640px",
      md: "840px",
      mdlg: "935px",
      lg: "1048px",
      xl: "1280px",
    },
  },
  plugins: [],
};
