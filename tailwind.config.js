/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
       "outfit":['Outfit', 'sans-serif'],
       'sans': ['Roboto', 'Arial', 'sans-serif']
    },
    colors:{
      darkBlue: '#326789',
      lightBlue:'#78a6c8',
    }
  },

},
plugins: [
  require('tailwind-scrollbar')
]
}