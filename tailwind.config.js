module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        title: ["Audiowide", "cursive"],
      },
      colors: {
        lightGray: {
          DEFAULT: "#F6F6F6",
          darker: "#9D9296"
        },
        dark: {
          DEFAULT: "#554F51"
        },
        rtkBlue: {
          DEFAULT: "#5C61CE",
          darker: "#4D52D6"
        },
        rtkRed: {
          DEFAULT: "#BE1953",
          darker: "#771F49",
          lighter: "#EB3355"
        },
        tpBg: {
          DEFAULT: "rgba(0, 0, 0, 0.4)"
        }
      },
    },
  },
  plugins: [],
  mode: "jit"
}