/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        expand: "expand 0.3s ease-out",
      },
      keyframes: {
        expand: {
          "0%": { overflowY: "hidden" },
          "100%": { overflowY: "hidden" },
        },
      },
    },
  },
  plugins: [],
};
