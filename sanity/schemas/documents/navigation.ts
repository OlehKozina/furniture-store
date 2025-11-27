import { FaBars as icon } from "react-icons/fa";
import { F } from "../tool";

export const navigation = {
  name: "navigation",
  type: "document",
  title: "Navigation",
  icon,
  fields: [
    F.string({
      name: "title",
      title: "Navigation Link",
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }: { title?: string }) {
      return {
        title: title || "Untitled",
        media: icon,
      };
    },
  },
};
