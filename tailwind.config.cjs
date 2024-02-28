/** @type {import('tailwindcss').Config}*/
const config = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors:  {
        'gray1': '#53504c',
        'gray2': '#454341',
        'gray3': '#383635',
        'gray4': '#2c2a29',
        'gray5': '#1f1e1d',
        'gray6': '#131212',
        'black': '#000000',
        'bright-orange': '#FF6320',
      },
    }, 
    fontFamily: {
      sans: ['Outfit', 'sans-serif'],
    },
  },
  plugins: []
};

module.exports = config;
