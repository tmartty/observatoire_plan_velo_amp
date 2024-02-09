/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {
      colors: {
        'cvv-blue-600': '#429ada',
        'cvv-blue-500': '#55a4dd',
        'cvv-blue-400': '#7fbbe6',
        'cvv-blue-300': '#aad2ee',
        'cvv-blue-200': '#d4e8f7',
        'cvv-blue-100': '#e9f3fb',
        'cvv-pink': '#C84271',
        'cvv-green': '#83C0B7'
      },
      typography: {
        DEFAULT: {
          css: {
            a: { color: '#429ada' }
          }
        }
      }
    }
  },
  plugins: [require('@tailwindcss/typography')]
};
