module.exports = {
  mode: 'jit',
  purge: ['./src/pages/**/*.{js,ts,tsx}', './src/components/**/*.{js,ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      height: {
        startSolidIcon: '21px',
      },
      colors: {
        amazon_blue: {
          moreLight: '#37475a',
          light: '#232F3E',
          DEFAULT: '#131921',
        },
        amazon_gray: '#ccc',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
