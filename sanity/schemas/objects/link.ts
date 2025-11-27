import { F } from "../tool";

export const link = F.object({
  name: "link",
  fields: [F.string({ name: "title" })],
});
