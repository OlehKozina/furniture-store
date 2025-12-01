import { F } from "../tool";

export const link = F.object({
  name: "link",
  fields: [
    F.string({
      name: "title",
      title: "Link Title",
    }),
    F.slug({
      name: "slug",
      title: "Slug",
      source: "title",
    }),
    F.array({
      name: "sublinks",
      title: "Sublinks (optional)",
      of: [{ type: "reference", to: [{ type: "categories" }] }],
    }),
  ],
});
