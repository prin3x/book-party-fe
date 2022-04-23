import React, { ReactChild, useEffect } from "react";
import useUserAuthentication from "../../hooks/useUserAuthentication";
import Navbar from "./Navbar";

type Props = {
  children: ReactChild;
};

function LayoutHOC({ children }: Props) {
  const { onStartApp } = useUserAuthentication();

  useEffect(() => {
    onStartApp();
  }, []);
  return (
    <div>
      <>
        <Navbar />
        {children}
      </>
    </div>
  );
}

export default LayoutHOC;
