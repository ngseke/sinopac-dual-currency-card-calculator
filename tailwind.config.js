module.exports = {
  purge: {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    // https://github.com/tailwindlabs/tailwindcss/issues/2943
    options: {
      safelist: ['dark'],
    },
  },
  darkMode: 'class',
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          lg: '2rem',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
