/** @type {import('tailwindcss').Config}*/
const config = {
  content: ['./src/**/*.{html,js,svelte,ts}'],

  theme: {
  colors:  {
    'gray-1': '#53504c',
    'gray-2': '#454341',
    'gray-3': '#383635',
    'gray-4': '#2c2a29',
    'gray-5': '#1f1e1d',
    'gray-6': '#131212',
    'black': '#000000',
    'bright-orange': '#FF6320',
  },
    extend: {}
  },
  fontFamily: {
    sans: ['Outfit', 'sans-serif'],
  },
  plugins: []
};

module.exports = config;
