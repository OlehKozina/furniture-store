import React from "react";
import { NavigationType } from "@/types";
import { buildContactLinks, buildSocialLinks } from "./utils";
import Navigation from "../Navigation";
import Logo from "../Logo";
import FooterLinks from "./FooterLinks";

const FooterContainer = ({
  footerContainer,
}: {
  footerContainer?: NavigationType;
}) => {
  if (!footerContainer) return null;

  const {
    address,
    email,
    navigation,
    phone,
    socialLinks: _socialLinks,
  } = footerContainer;

  const contactLinks = buildContactLinks(phone, email, address);
  const socialLinks = buildSocialLinks(_socialLinks);

  return (
    <div className="container z-content relative flex text-center flex-grow flex-col md:flex-row">
      <Logo
        className="flex justify-center md:inline-block md:justify-start z-[5] pt-0"
        width={100}
        height={100}
      />

      <div className="flex z-9 mt-4 flex-grow justify-between lg:justify-evenly max-md:gap-6 flex-col md:flex-row text-center md:mt-0">
        {!!navigation?.length &&
          navigation.map((column) => (
            <Navigation
              key={column.title}
              title={column.title}
              links={column.links}
              classNames={{
                root: "flex flex-col gap-5 items-center md:items-start",
              }}
            />
          ))}
        <FooterLinks contactLinks={contactLinks} socialLinks={socialLinks} />
      </div>
    </div>
  );
};

export default FooterContainer;
