/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./publicHTML/*.html"],
  theme: {
    fontFamily: {
      poppinsRegular: " poppins regular",
      poppinsMedium: "poppins medium",
      poppinsSemiBold: "poppins semiBold",
    },
    extend: {
      colors: {
        "white-gray": "#E5E5E5",
        "sub-text": "#B8B8B8",
        "cyber-blue": "#0092C9",
        "dark-blue": "#4667FB",
      },
    },
  },
  plugins: [],
};
