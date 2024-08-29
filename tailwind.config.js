/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        move1: {
          "0%": { transform: "translate(0vw, 0vh)" },
          "25%": { transform: "translate(80vw, 10vh)" },
          "50%": { transform: "translate(80vw, 70vh)" },
          "75%": { transform: "translate(0vw, 90vh)" },
          "100%": { transform: "translate(0vw, 0vh)" },
        },
        move2: {
          "0%": { transform: "translate(20vw, 20vh)" },
          "25%": { transform: "translate(60vw, 20vh)" },
          "50%": { transform: "translate(60vw, 80vh)" },
          "75%": { transform: "translate(10vw, 80vh)" },
          "100%": { transform: "translate(20vw, 20vh)" },
        },
        move3: {
          "0%": { transform: "translate(50vw, 10vh)" },
          "25%": { transform: "translate(90vw, 30vh)" },
          "50%": { transform: "translate(90vw, 90vh)" },
          "75%": { transform: "translate(40vw, 90vh)" },
          "100%": { transform: "translate(50vw, 10vh)" },
        },
      },
      animation: {
        move1: "move1 20s infinite linear",
        move2: "move2 15s infinite linear",
        move3: "move3 10s infinite linear",
      },
    },
  },
  plugins: [],
};
