import React, { FunctionComponent } from "react";
import { createPortal } from "react-dom";

const Modal: FunctionComponent = ({ children }) => {
  const elRef = React.useRef(document.createElement("div"));

  React.useEffect(() => {
    const modalRoot = document.getElementById("modal");
    modalRoot?.appendChild(elRef.current);

    return () => {
      modalRoot?.removeChild(elRef.current);
    };
  }, []);

  return createPortal(<div>{children}</div>, elRef.current);
};

export default Modal;
