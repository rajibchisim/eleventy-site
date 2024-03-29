module.exports = {
  mode: 'jit',
  purge: [
    './src/**/*.html',
    './src/**/*.liquid',
    './src/**/*.js',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
