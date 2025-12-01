import slugify from "slugify";

const generateSlug = (source = ""): string =>
  slugify(source, { lower: true, remove: /[*+~.()'"!:@]/g });

export default generateSlug;
