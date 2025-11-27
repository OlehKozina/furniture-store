import { FormFieldType } from "@/types/ContactType";
import React from "react";

const FormField = ({ field }: { field?: FormFieldType }) => {
  if (!field) return;
  const { label, type, required, name } = field;
  return (
    <div className="mb-4 md:mb-8 w-3/4" key={label}>
      <label className="hidden" htmlFor="user-name">
        {label}
      </label>
      <input
        className="w-full py-2 md:py-4 px-5 md:px-10 rounded-lg border transition-all border-brand-brick bg-brand-light text-base text-brand-default leading-[1.17]"
        type={type}
        placeholder={label}
        name={name}
        required={required}
      />
    </div>
  );
};

export default FormField;
