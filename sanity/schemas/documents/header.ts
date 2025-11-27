import { FaBars as icon } from "react-icons/fa";
import { F } from "../tool";

export const header = {
  name: "header",
  type: "document",
  title: "Header",
  icon,

  fields: [
    F.array({
      name: "navigation",
      of: [{ type: "link" }],
      title: "Navigation Links",
    }),
  ],

  preview: {
    select: {
      navigation: "navigation",
    },
    prepare() {
      return {
        title: "Header",
        media: icon,
      };
    },
  },
};
