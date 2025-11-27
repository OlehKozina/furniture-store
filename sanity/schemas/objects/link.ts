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
    }),
  ],
});
