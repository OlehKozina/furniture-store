import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "framer-motion";
import { PortableTextBlock } from "next-sanity";
import React from "react";
import Form from "./Form";
import { FormType } from "@/types";

interface FormProps {
  onClose: () => void;
  isVisible?: boolean;
  privacyPolicy?: PortableTextBlock;
  form?: FormType;
}

const ModalForm: React.FC<FormProps> = ({
  isVisible,
  onClose,
  privacyPolicy,
  form,
}) => {
  return (
    <AnimatePresence initial={false}>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-brand-dark bg-opacity-50 p-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          key="form"
        >
          <motion.div
            initial={{ y: 50, scale: 0.95 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: 50, scale: 0.95 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative !max-w-[28rem] md:!max-w-[38rem] z-10 overflow-y-auto flex flex-col justify-center items-center w-full h-auto rounded-[2rem] transition-opacity duration-slow"
          >
            <button
              className="border-none bg-transparent cursor-pointer absolute top-7 right-5"
              type="button"
            >
              <FontAwesomeIcon
                icon={faXmark}
                className="hover:text-brand-default text-xl transition-colors"
                onClick={onClose}
              />
            </button>
            <Form
              className="px-12 py-10 md:py-20 w-full !mx-0 no-scroll-bar !h-full !max-h-[60vh] md:!max-h-[70vh]"
              heading="Request a call"
              privacyPolicy={privacyPolicy}
              isVisible={isVisible}
              form={form}
              classNames={{ privacyPolicy: "!bg-opacity-0" }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ModalForm;
