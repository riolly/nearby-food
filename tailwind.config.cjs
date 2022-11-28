/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Autour One', 'cursive'],
        body: ['Abel', 'sans-serif'],
        highlight: ['Architects Daughter', 'cursive'],
      },
      colors: {
        light: {
          bg: colors.slate[50],
          heading: colors.slate[200],
          body: colors.slate[300],
        },
        dark: {
          bg: colors.slate[900],
          heading: colors.slate[800],
          body: colors.slate[700],
        },
        primary: {
          lightest: colors.indigo[100],
          lighter: colors.indigo[300],
          normal: colors.indigo[500],
          darker: colors.indigo[700],
          darkest: colors.indigo[900],
        },
        secondary: {
          lightest: colors.violet[50],
          lighter: colors.violet[200],
          normal: colors.violet[400],
          darker: colors.violet[600],
          darkest: colors.violet[800],
        },
      },
    },
  },
  plugins: [],
}
