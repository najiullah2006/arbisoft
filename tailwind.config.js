/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        trello: {
          blue: '#0079bf',
          darkBlue: '#026aa7',
          charcoal: '#172b4d',
          textGray: '#5e6c84',
          bgGray: '#f1f2f4',
        }
      },
      width: {
        '68': '272px', 
      }
    },
  },
  plugins: [],
}