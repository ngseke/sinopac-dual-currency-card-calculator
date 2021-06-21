module.exports = {
  mode: 'jit',
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
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
