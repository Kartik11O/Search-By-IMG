/** @type {import('tailwindcss').Config} */
export const content = ["./**/*.{html,js}"];
export const theme = {
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
};
export const plugins = [];