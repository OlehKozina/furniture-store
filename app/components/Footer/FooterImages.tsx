import React from "react";
import Image from "next/image";

const FooterImages = ({
  footerImages,
}: {
  footerImages?: { left?: string; right?: string };
}) => {
  return (
    <>
      <Image
        src={footerImages?.left || "/dog_footer_left.png"}
        alt="bread-left"
        width={100}
        height={24}
        className="w-[8rem] md:w-[11rem] bg-no-repeat absolute max-md:top-0 md:bottom-0 left-0"
      />
      <Image
        src={footerImages?.right || "/footer_dog_image.png"}
        alt="bread-left"
        width={80}
        height={24}
        className="absolute bottom-[16.3rem] md:bottom-[4.5rem] right-0 w-[8rem] bg-no-repeat md:w-[10rem]"
      />
    </>
  );
};

export default FooterImages;
