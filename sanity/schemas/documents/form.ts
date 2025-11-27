import { FaWpforms as icon } from "react-icons/fa";
import { F } from "../tool";

export const form = {
  name: "form",
  title: "Form",
  type: "document",
  icon,
  fields: [
    F.string({ name: "name", title: "Form Name" }),
    F.array({
      name: "fields",
      title: "Fields",
      of: [
        F.object({
          name: "field",
          fields: [
            F.string({ name: "label" }),
            F.string({ name: "name" }),
            F.string({ name: "type", title: "Input Type" }),
            F.boolean({ name: "required" }),
          ],
        }),
      ],
    }),
    F.string({ name: "buttonLabel", title: "Button Label" }),
  ],
  preview: {
    select: { title: "name", subtitle: "buttonLabel", media: "icon" },
    prepare: ({ title, media }: { title?: string; media?: any }) => ({
      title: title || "Untitled Form",
      media,
    }),
  },
};
