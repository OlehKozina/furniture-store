import type { Config } from "tailwindcss";
import {
  screens,
  colors,
  duration,
  type,
  boxShadow,
  zIndex,
} from "./app/design/tokens";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens,
    colors,
    ...type,
    extend: {
      boxShadow: boxShadow,
      transitionDuration: duration,
      zIndex,
    },
  },
  plugins: [],
};
export default config;
