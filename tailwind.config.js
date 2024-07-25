/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'selector',
  //darkMode: "class",
  //ligthMode: "class",
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "1100px",
      xl: "1440px",
    },
    extend: {
      colors: {
        red: "#d6436e",
        red2: '#dc2626',
        green: "#33cc66",
        green2: "#25da72", 
        greenM1: "#22b455",
        greenM2: "#80ce87",
        greenM3: "#92e5a1",
        greenM4: "#204829",
        blackM: "#020209",
        grayM: "#3c444c",
        whiteZinc: "#f4f4f5",
        lightgrey: "#dddddd",
      },
      fontSize: {
        sm: "14px", 
        md: "18px", 
        lg: "24px", 
        xl: "32px", 
        xxl: "40px",
        base: "16px",
      },
    },
  },
  plugins: [
    // eslint-disable-next-line no-undef
    require('daisyui'),
  ],
}

