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
          heading: colors.slate[100],
          body: colors.slate[200],
        },
        dark: {
          bg: colors.slate[900],
          heading: colors.slate[800],
          body: colors.slate[700],
        },
        primary: {
          lightest: colors.red[300],
          lighter: colors.red[400],
          normal: colors.red[500],
          darker: colors.red[700],
          darkest: colors.red[900],
        },
        secondary: {
          lightest: colors.amber[300],
          lighter: colors.amber[400],
          normal: colors.amber[500],
          darker: colors.amber[600],
          darkest: colors.amber[700],
        },
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp'), require('@tailwindcss/forms')],
}
