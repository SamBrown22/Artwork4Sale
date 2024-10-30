import type { Config } from "tailwindcss"
import daisyui from "daisyui"

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        light: {
          primary: "#7e00ff",
          secondary: "#00f200",
          accent: "#bf8200",
          neutral: "#090a00",
          "base-100": "#fffef9",
          "base-content": "#1a1a1a",
          info: "#0090bc",
          success: "#00fdc8",
          warning: "#ff5300",
          error: "#ff003f",
        },
      },
      {
        dark: {
          primary: "#7e00ff",
          secondary: "#00f200",
          accent: "#bf8200",
          neutral: "#090a00",
          "base-100": "#1a1a1a",
          "base-content": "#f0f0f0",
          info: "#0090bc",
          success: "#00fdc8",
          warning: "#ff5300",
          error: "#ff003f",
        },
      },
    ],
  },
  darkMode: "class",
}

export default config