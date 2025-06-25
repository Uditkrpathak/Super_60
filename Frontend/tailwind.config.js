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
        sub: ['DM Sans', 'sans-serif'],         // subheadings, buttons
        body: ['Roboto', 'sans-serif'],         // paragraphs, long content
      },
      colors: {
       blue:"#002244", //  blue color
       orange:"#C57726", //  orange color
      },
      scrollBehavior: ['responsive'],
    },
  },
  plugins: [],
}
