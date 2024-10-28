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
        mytheme: {
          primary: "#7e00ff",
          secondary: "#00f200",
          accent: "#bf8200",
          neutral: "#090a00",
          "base-100": "#fffef9",
          info: "#0090bc",
          success: "#00fdc8",
          warning: "#ff5300",
          error: "#ff003f",
        },
      },
    ],
  },
}
export default config
