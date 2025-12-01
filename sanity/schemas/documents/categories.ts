import { defineType } from "sanity";
import { F } from "../tool";
import { CaseIcon as icon } from "@sanity/icons";

export const categories = defineType({
  name: "categories",
  type: "document",
  title: "Categories",
  icon,
  fields: [
    F.string({
      name: "name",
      title: "Category Name",
      validation: (Rule: any) => Rule.required(),
    }),
    F.image({ name: "image", title: "Category Image", hotspot: true }),
  ],
});
