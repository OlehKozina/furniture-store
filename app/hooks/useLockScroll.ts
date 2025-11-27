import { useEffect } from "react";

export const useLockScroll = (lock?: boolean) => {
  useEffect(() => {
    const html = document.documentElement;

    if (lock) {
      document.body.style.overflow = "hidden";
      html.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      html.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      html.style.overflow = "";
    };
  }, [lock]);
};
