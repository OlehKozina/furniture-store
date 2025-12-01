import { defineType } from "sanity";
import { F } from "../tool";
import { PackageIcon as icon } from "@sanity/icons";

export const products = defineType({
  name: "products",
  type: "document",
  title: "Products",
  icon,
  fields: [
    F.string({
      name: "name",
    }),
    F.image({ name: "image", hotspot: true }),
    F.rating({ name: "rating", title: "Rating (1–5)" }),
    F.number({ name: "price" }),
    F.number({ name: "oldPrice" }),
    F.reference({
      name: "categories",
      to: [{ type: "categories" }],
      title: "Category",
    }),
  ],
});
