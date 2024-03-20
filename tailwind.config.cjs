/** @type {import('tailwindcss').Config}*/
const config = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        gray1: '#dbd7d2',
        gray2: '#b7b3af',
        gray3: '#94918e',
        gray4: '#72706d',
        gray5: '#52504f',
        gray6: '#343332',
        gray7: '#191818',
        black: '#000000',
        focus: '#0000ff',
        'bright-orange': '#FF6320',
        'input-dark': '#131212',
        'indicator-1': '#FF6320',
        'indicator-2': '#FFA178',
        'indicator-3': '#FFA178',
      },
      textColor: {
        'indicator-1': '#FF6320',
        'indicator-2': '#FFA178',
        'indicator-3': '#FFA178',
      },
      height: {
        input: '35px'
      },
      borderRadius: {
        input: '3px'
      }
    },
    fontFamily: {
      sans: ['Outfit', 'sans-serif']
    }
  },
  plugins: [],
  darkMode: 'selector'
};

module.exports = config;
