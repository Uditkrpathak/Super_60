/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Montserrat', 'sans-serif'],  // H1, H2, section titles
        sub: ['DM Sans', 'sans-serif'],         // subheadings, buttons
        body: ['Roboto', 'sans-serif'],         // paragraphs, long content
      },
      colors: {
       blue:"#002244", //  blue color
       orange:"#C57726", //  orange color
      },
    },
  },
  plugins: [],
}
