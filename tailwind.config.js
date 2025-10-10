/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './public/index.html',
  ],
  theme: {
    extend: {
      colors: {
        brand: '#1e40af',
      },
      fontFamily: {
        display: ['Oswald', 'sans-serif'], // Custom display font
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'), // For better form styling
  ],
}
