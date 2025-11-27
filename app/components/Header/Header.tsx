"use client";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HeaderNav from "./HeaderNav";
import React, { useState, useEffect } from "react";
import { NavigationType, FormType } from "@/types";
import MobileMenu from "../MobileMenu/MobileMenu";
import { ModalForm } from "../Form";
import clsx from "clsx";

const Header = ({ header }: { header: NavigationType }) => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const toggleForm = () => setIsFormVisible((prev) => !prev);

  const [isMobMenuVisible, setIsMobMenuVisible] = useState(false);
  const toggleMobMenu = () => setIsMobMenuVisible((prev) => !prev);

  const [hidden, setHidden] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const updateScroll = () => {
      const currentY = window.scrollY;
      if (currentY > lastScrollY && currentY > 80) setHidden(true);
      else setHidden(false);
      lastScrollY = currentY;
    };

    window.addEventListener("scroll", updateScroll);
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id;
          if (entry.isIntersecting) {
            if (id === "hero") {
              setActiveSection(null);
            } else setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.6 }
    );

    sections.forEach((section) => observer.observe(section));

    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  if (!header) return null;
  const { navigation, privacyPolicy, form } = header;

  return (
    <header
      className={clsx(
        "px-2 top-0 left-0 w-full py-4 z-10 sticky transition-all",
        hidden && "-translate-y-full"
      )}
    >
      <div
        className={clsx(
          "container transition-all rounded-3xl p-4",
          isMobMenuVisible && "rounded-br-none"
        )}
        style={{
          background: "linear-gradient(to right, #A1C4FD, #C2E9FB)",
        }}
      >
        <div className="flex items-center gap-10 relative">
          <HeaderNav navigation={navigation} activeSection={activeSection} />
          <button
            className="hidden transition-all lg:block bg-brand-default text-brand-light border border-brand-default rounded-lg cursor-pointer text-lg lg:text-xl font-extrabold hover:bg-opacity-80 px-6 py-3"
            type="button"
            onClick={toggleForm}
          >
            Request a call
          </button>
          <ModalForm
            onClose={toggleForm}
            isVisible={isFormVisible}
            privacyPolicy={privacyPolicy}
            form={form}
          />
          {!isMobMenuVisible && (
            <button
              className=" bg-transparent border-none text-brand-light md:hidden menu-btn-open"
              type="button"
            >
              <FontAwesomeIcon
                icon={faBars}
                className="hover:text-brand-default w-6"
                onClick={toggleMobMenu}
              />
            </button>
          )}
          <MobileMenu
            onClose={toggleMobMenu}
            isVisible={isMobMenuVisible}
            navigation={navigation}
            className="absolute -right-6 -top-3.5"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
