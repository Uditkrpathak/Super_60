/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        sub: ['DM Sans', 'sans-serif'],
        body: ['Roboto', 'sans-serif'],
      },
      colors: {
        blue: "#002244",
        orange: "#C57726",
      },
      scrollBehavior: ['responsive'],
    },
  },

  // ✅ Correct placement of plugin
  plugins: [require('tailwind-scrollbar-hide')],
}
