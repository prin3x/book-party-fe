import React, { ReactChild } from "react";
import Navbar from "./Navbar";

type Props = {
    children: ReactChild;
};

function LayoutHOC({children}: Props) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}

export default LayoutHOC;
