import React from "react";

export const useWindow = () => {
  const [isMobile, setMobile] = React.useState<boolean | undefined>(undefined);
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setMobile(window.innerWidth < 1300);
      };
      window.addEventListener("resize", handleResize);
      handleResize();
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);
  return isMobile;
};
