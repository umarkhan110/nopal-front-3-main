import { nextui } from "@nextui-org/react";

const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    //* customize tailwind css container class
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        md: "2rem",
      },
    },

    //* customize tailwind css breakpoints
    screens: {
      xxs: "320px",
      xs: "375px",
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1280px",
      "2xl": "1440px",
      "3xl": "1600px",
    },
    extend: {
      //* add your own colors here
      textColor: {
        secondaryDark: "#A4A4A4",
        secondaryLight: "#515151",
      },
      backgroundColor: {
        secondaryDark: "#232323",
        tertiaryDark: "#383535",
        dark: "#0D0D0D",
        secondaryLight: "#F5F5F5",
        tertiaryLight: "#D8D6D6",
      },
      borderColor: {
        primaryBorderDark: "#5E5E5E",
        primaryBorderLight: "#C8C8C8",
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        dark: {
          extend: "dark",
          colors: {
            background: "#161616",
            foreground: "#ffffff",
            primary: {
              DEFAULT: "#697b18", // *add color here for dark mode
              foreground: "#ffffff",
            },
            focus: "#697b18",
          },
        },
        light: {
          extend: "light",
          colors: {
            background: "#fff",
            foreground: "black",
            primary: {
              DEFAULT: "#697b18", // *add color here for light mode
              foreground: "#ffffff",
            },
            focus: "#697b18",
          },
        },
      },
    }),
  ],
};

export default config;
