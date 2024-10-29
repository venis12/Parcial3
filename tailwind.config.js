/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ["light"], // Esto asegura que el tema por defecto sea el claro (blanco)
  },
  // eslint-disable-next-line no-undef
  plugins: [ require( "daisyui" ) ],
}

