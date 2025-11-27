import { defineField, defineType } from "sanity";

export const F = {
  string: (opts: { name: string; title?: string; validation?: any }) =>
    defineField({ type: "string", ...opts }),
  text: (opts: { name: string; title?: string; rows?: number }) =>
    defineField({ type: "text", ...opts }),
  block: (opts: { name: string; title?: string }) =>
    defineField({ type: "array", of: [{ type: "block" }], ...opts }),
  object: (opts: {
    name: string;
    fields: any[];
    title?: string;
    icon?: any;
    preview?: any;
  }) => defineType({ type: "object", ...opts }),
  array: (opts: { name: string; of: any[]; title?: string }) =>
    defineField({ type: "array", ...opts }),
  field: (type: string) =>
    defineField({
      type,
      name: type,
    }),
  boolean: (opts: { name: string; title?: string }) =>
    defineField({ type: "boolean", ...opts }),
  file: (opts: { name: string; title?: string; accept?: string }) =>
    defineField({ type: "file", options: { accept: opts.accept }, ...opts }),
  image: (opts: { name: string; title?: string; hotspot?: boolean }) =>
    defineField({ type: "image", options: { hotspot: opts.hotspot }, ...opts }),
  slug: (opts: {
    name: string;
    title?: string;
    source?: string;
    maxLength?: number;
  }) =>
    defineField({
      type: "slug",
      ...opts,
      options: {
        source: opts.source,
        maxLength: opts.maxLength || 96,
      },
    }),
  reference: (opts: { name: string; title?: string; to: { type: string }[] }) =>
    defineField({ type: "reference", ...opts }),
};

export const G = {
  define: (name: string, opts: { title?: string; default?: boolean } = {}) => ({
    name,
    title: opts.title || name[0].toUpperCase() + name.slice(1),
    default: opts.default,
  }),
  group: (name: string, fields: any[]) =>
    fields.map((field) => ({
      ...field,
      group: name,
    })),
};
