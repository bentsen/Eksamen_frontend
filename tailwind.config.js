/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'navbar-color' : '#262321',
        'selection-color' : '#353535'
      }
    },
  },
  plugins: [],
}
