const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
    './storage/framework/views/*.php',
    './resources/views/**/*.blade.php',
    './resources/js/**/*.{ts,tsx}',
  ],

  theme: {
    extend: {
      colors: {
        'nes-dark': '#212529',
        stone: {
          700: '#444444',
        },
      },
      fontFamily: {
        sans: ['"Press Start 2P"', ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        xxs: '0.5rem',
      },
    },
  },

  plugins: [require('@tailwindcss/forms')],
}
