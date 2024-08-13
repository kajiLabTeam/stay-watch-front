const customColors = {
  staywatch: {
    'main': '#F9EB76',
    'green': '#00D098',
    'blue': '#2FB7FF',
    'red': '#FF104E',
    'accent': '#1E5266',
    'black': '#333333',
  }
}

module.exports = {
  mode: 'jit',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/features/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        staywatch: customColors.staywatch,
      },
    },
    screens: {
      sm: '640px',
      md: '840px',
      mdlg: '935px',
      lg: '1048px',
      xl: '1280px',
    },
  },
  plugins: [],
  safelist: ['bg-red-400'],
};
