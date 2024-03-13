/** @type {import('tailwindcss').Config}*/
const config = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        gray1: '#53504c',
        gray2: '#454341',
        gray3: '#383635',
        gray4: '#2c2a29',
        gray5: '#1f1e1d',
        gray6: '#131212',
        black: '#000000',
        focus: '#0000ff',
        'bright-orange': '#FF6320',
        'input-dark': '#131212'
      },
      height:  {
        'input': '35px',
      },
      borderRadius: {
        input: '3px',
      },
    },
    fontFamily: {
      sans: ['Outfit', 'sans-serif']
    }
  },
  plugins: [],
  darkMode: 'selector'
};

module.exports = config;
