/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors : {
        green : {
          500 : "#18b8a0",
          300 : "#ddfef5",
          200 : "#f0fffc"
        }
      }
    },
  },
  plugins: [],
}

