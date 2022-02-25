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
          DEFAULT: "#141C25",
          lighter: "#1C2126"
        },
        aboutThat_red: {
          DEFAULT: "#9E363E",
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