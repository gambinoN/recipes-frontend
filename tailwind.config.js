/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      'dark-green': "#1A3636",
      'olive': "#40534C",
      'light-olive': "#677D6A",
      'beige': "#D6BD98",
      'whitesmoke': "#f5f5f5",
      'white': "#ffffff"
    },
    extend: {
      fontFamily: {
        roboto: ['"Roboto"', ...defaultTheme.fontFamily.sans],
        anton: ['"Anton"', ...defaultTheme.fontFamily.sans],
      },
      flex: {
        'half': '1 0 50%'
      }
    },
  },
  plugins: [],
}


