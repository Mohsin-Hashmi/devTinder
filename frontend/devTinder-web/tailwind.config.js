import daisyui from 'daisyui';

 /**@type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        wave: "wave 1.5s infinite",
      },
      keyframes: {
        wave: {
          "0%, 100%": { transform: "rotate(0deg)" },
          "50%": { transform: "rotate(20deg)" },
        },
      },
    },
  },
  daisyui: {
    themes: ["light", "dark", "cupcake", "synthwave"],
  },
  plugins:[daisyui,]
}