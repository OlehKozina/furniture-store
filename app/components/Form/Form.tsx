"use client";
import clsx from "clsx";
import { PortableTextBlock } from "next-sanity";
import React, { useState } from "react";
import PrivacyPolicy from "./PrivacyPolicy";
import { FormType } from "@/types";
import Heading from "../Heading";
import { useLockScroll } from "@/app/hooks/useLockScroll";
import FormField from "./FormField";

interface FormProps {
  heading?: string;
  isVisible?: boolean;
  privacyPolicy?: PortableTextBlock;
  form?: FormType;
  className?: string;
  classNames?: {
    privacyPolicy?: string;
  };
}

const Form = ({
  heading,
  privacyPolicy,
  form,
  className,
  classNames,
  isVisible,
}: FormProps) => {
  const [isPolicyVisible, setIsPolicyVisible] = useState(false);
  useLockScroll(isVisible || isPolicyVisible);
  const togglePolicy = () => setIsPolicyVisible((prev) => !prev);
  if (!form) return;
  const { name, fields, buttonLabel } = form;
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
      }),
    });

    if (!res.ok) {
      const data = await res.json();
      alert(`Error: ${data.message}`);
      return;
    }

    alert("Message sent!");
    form.reset();
  };

  return (
    <div
      className={clsx(
        "max-w-[38rem] rounded-3xl p-12 mx-auto bg-brand-dark",
        className
      )}
    >
      <Heading
        heading={heading}
        className="mb-4 mx-auto text-center text-2xl sm:text-4xl 1000:text-6xl"
      />
      <p className="text-brand-default text-center mb-3">{name}</p>
      <form
        data-form="contact-form"
        className="max-w-[30rem] flex flex-col items-center mx-auto text-brand-dark"
        onSubmit={handleSubmit}
      >
        {!!fields?.length &&
          fields.map((field) => {
            return <FormField field={field} key={field.label} />;
          })}
        <button
          className="mx-auto transition-all mb-6 block px-5 py-2 bg-brand-default hover:bg-opacity-80 text-brand-light border border-brand-default rounded-lg cursor-pointer text-xl font-extrabold md:px-8 md:py-4"
          type="submit"
        >
          {buttonLabel}
        </button>
        <div
          className={clsx(
            "mx-auto max-w-[15rem] text-xs text-center text-brand-default"
          )}
        >
          By clicking the button I agree with{" "}
          <span>
            <button
              type="button"
              className="text-brand-default underline hover:opacity-80 transition-opacity"
              onClick={togglePolicy}
            >
              privacy policy
            </button>
            {privacyPolicy && (
              <PrivacyPolicy
                onClose={togglePolicy}
                privacyPolicy={privacyPolicy}
                isVisible={isPolicyVisible}
                className={classNames?.privacyPolicy}
              />
            )}
          </span>
        </div>
      </form>
    </div>
  );
};

export default Form;
