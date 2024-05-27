/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": '#[#6D5BD0]',
        "fonts-primary": "#25213B",
        border: '#e2e2e2',      
        disabledText: 'var(--disabled-text-color)',
      },
      fontFamily: {
        primary: "Inter",
      },
    },
  },
  plugins: [],
}