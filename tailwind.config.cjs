/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        web: {
          boton: "#787878",
          boton2: "#510d0d",
          fondo: "#C9D5E0",
          topBar: "#4FA9A9",
          loginButton: "#A5E1AD",
          formBgDarkMode: "#1b1b32",
          custom1: "#21094E",
          custom2: "#511281",
          custom3: "#4CA1A3",
          custom4: "#A5E1AD"
        }
      },

      fontFamily: {
        robotoslab: "RobotoSlab",
      }
    },
  },
  plugins: [],
};
