/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["index.html"],
  theme: {
    extend: {
      height: {
        Full: "100vh",
        test: '30vh'
      },
      width: {
        WFull: '100vw'
      },
      colors: {
        OffWhite: '	rgb(221 221 221)'
      }
    },
  },
  plugins: [],
}