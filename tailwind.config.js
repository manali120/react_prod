/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'dark-blue': '#001f3f',
         'blue-200': '#DDD0C8',
         
      },
      gray: {
        300: '#DDD0C8',
        600: '#c3cccb',
      },
      fontFamily: {
        'fjalla-one': ['Fjalla One', 'sans-serif'],
      },
      gradientColorStops: theme => ({
        ...theme('colors'),
        'light-blue-100': '#ebf8ff',
        'light-blue-300': '#90cdf4',
      }),
      radialGradientColors: {
        custom: ['#323232', 'transparent'],
      },
    },
  },
  plugins: [
    require('tailwindcss-gradients'),
  ],
  
}

