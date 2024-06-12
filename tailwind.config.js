/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{html,njk,js,json}'],
  theme: {
    extend: {
      // CONTAINER
      container: {
        center: true,
        padding: {
          DEFAULT: '20px',
          sm: '20px',
          md: '32px',
          xl: '32px',
        },
      },
      // COLORS
      colors: {
        body: '#ffffff', // bg-body
        white: {
          DEFAULT: '#ffffff', // *-white
          // fa: '#fafafa', // *-white-fa
        },
        black: {
          DEFAULT: '#000000', // *-black
          // '01': '#010101', // *-black-01
          // '20': '#202020',
        },
        accent: {
          DEFAULT: '#FF6C00', // *-accent
        },
      },
      // BACKGROUND IMAGES
      backgroundImage: {
        checkbox: "url('/assets/images/icon/bg-checkbox.svg')", // bg-checkbox
      },
    },
    // MEDIA QUERIES
    screens: {
      sm: '480px',
      md: '768px',
      xl: '1280px',
      smOnly: { max: '767.98px' },
      mdOnly: { min: '768px', max: '1279.98px' },
      notXl: { max: '1279.98px' },
    },
    // FONTS
    fontFamily: {
      montserrat: ['Montserrat', 'sans-serif'], // font-montserrat
      // twowords: ['"Two Words"', 'serif'],
    },
  },
  plugins: [],
};
