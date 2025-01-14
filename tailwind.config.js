/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#d97706',     // Amber
        secondary: '#16a34a',   // Green
        accent: '#dc2626',      // Red
        background: '#fef3c7',  // Warm Light
        text: '#4b5563',        // Cool Gray (Dark)
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

