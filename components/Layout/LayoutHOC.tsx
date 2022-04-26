import React, { ReactChild, useEffect } from "react";
import useNotification from "../../hooks/useNotification";
import useUserAuthentication from "../../hooks/useUserAuthentication";
import Navbar from "./Navbar";

type Props = {
  children: ReactChild;
};

function LayoutHOC({ children }: Props) {
  const { onStartApp } = useUserAuthentication();
  const { fetchMyNoti } = useNotification();

  useEffect(() => {
    onStartApp();
    fetchMyNoti();
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
