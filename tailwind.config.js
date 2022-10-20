/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gyellow: '#FEBF00',
      },
      fontFamily: {
        'sf-regular': ['sf-regular'],
        'sf-medium': ['sf-medium'],
        'sf-bold': ['sf-bold'],
      }
    },
  },
  plugins: [],
}
