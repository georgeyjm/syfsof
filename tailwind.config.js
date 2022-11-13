/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        'primary': { regular: "#88b04b", dark: "#476930", ultralight: "#f5f7ee" },
        'complement': { regular: "#c9b374", dark: "#8c6f49" },
      }
    },
  },
  plugins: [
    require('flowbite/plugin'),
  ],
}
