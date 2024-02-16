import { ReactEventHandler, ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

import clases from "./Modal.module.scss";

const Modal: React.FC<{
  children: ReactNode;
  onClose: ReactEventHandler<HTMLDialogElement>;
}> = ({ children, onClose }) => {
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const modal = dialog.current;
    modal?.showModal();
  }, []);

  return createPortal(
    <dialog className={clases.modal} ref={dialog} onClose={onClose}>
      {children}
    </dialog>,
    document.getElementById("modal")!
  );
};

export default Modal;
