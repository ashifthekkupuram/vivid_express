/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins'],
      }
    },
    colors: {
      'primary': '#1d3557',
      'secondary': '#457b9d',
      'secondary-variant': '#a8dadc',
      // 'background': '#7D6167',
      'error': '#e63946',
      'white': '#FFFFFF',
      'black': '#000000'
    }
  },
  plugins: [],
}

