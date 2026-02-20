/** @type {import('tailwindcss').Config} */
export default {
  content: 
  ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], 
  theme: { 
    extend: {
      colors: {
        primary: "#FF5A36",
        secondary: "#1E2A41",
        "light-gray": "#F5F5F5",
      }
    }, 
  }, 
  plugins: [], 
}
