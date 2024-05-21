import type { Config } from "tailwindcss";
import colors from 'tailwindcss/colors'

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      ...colors,
      'primary': '#FFDD31',
      'btn-background-from': '#FFDD31',
      'btn-background-to': '#FFD500',
      'btn-background-hover-from': '#FFD500',
      'btn-background-hover-to': '#FFD500',
      'primary-pink': '#FF7C92',
    }
  },
  plugins: [],
};
export default config;
