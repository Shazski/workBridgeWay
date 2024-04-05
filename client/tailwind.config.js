import withMT from "@material-tailwind/react/utils/withMT"


/** @type {import('tailwindcss').Config} */
export default withMT( {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'lightgreen':'#197195'
      },
      daisyui: {
        themes: ["light", "dark", "cupcake"],
      },
    },
  },
  plugins: [require("daisyui")],
})