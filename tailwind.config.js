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
      ...colors,
      gray: colors.trueGray,
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
