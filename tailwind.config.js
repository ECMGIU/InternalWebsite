const colors = require('tailwindcss/colors');

module.exports = {
  purge: {
    mode: 'all',
    preserveHtmlElements: false,
    content: [
      './src/**/*.{js,jsx,ts,tsx}',
      './public/index.html',
    ],
  },
  darkMode: 'media',
  theme: {
    colors: {
      gray: colors.trueGray,
      ...colors,
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
