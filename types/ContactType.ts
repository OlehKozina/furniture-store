import { PortableTextBlock } from "next-sanity";

export type ContactType = {
  heading?: string;
  form?: FormType;
  direction?: string;
  privacyPolicy?: PortableTextBlock;
};

export type FormFieldType = {
  label?: string;
  name?: string;
  required?: boolean;
  type?: string;
};

export type FormType = {
  name?: string;
  buttonLabel?: string;
  fields?: FormFieldType[];
};
