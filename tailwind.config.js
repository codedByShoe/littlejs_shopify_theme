/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './layout/*.liquid',
    './sections/*.liquid',
    './snippets/*.liquid',
    './templates/**/*.liquid'
  ],
  theme: {
    extend: {
      height: {
        '94': '22rem'
      }
    },
  },
  daisyui: {
    themes: [
      'pastel',
      'dark',
      'light'
    ]
  },
  plugins: [require('@tailwindcss/forms')],
}

