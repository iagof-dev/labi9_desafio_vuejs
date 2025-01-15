/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg-primary": "#FFFFFF",
        "bg-color-alt": "#00A865",
        "primary-color": "#059669",
        "secondary-color": "#10B981",
        "text-color-primary": "#334155",
        "text-color-secondary": "#94A3B8",
        "text-color-alt": "#475599",
      }
    }
  },
  plugins: [],
}

