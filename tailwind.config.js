/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          500: '#272c2d',
        },
        secondary: {
          500: '#65dc74',
        },
        danger: {
          500: '#f74d4d',
        },
        light: {
          500: '#e7e9ec',
        },
      },
    },
  },
  plugins: [],
};
