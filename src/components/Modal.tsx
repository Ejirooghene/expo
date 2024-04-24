import React from "react";
import loader from "/svgs/loader.svg";

interface ModalProps {}

const Modal: React.FC<ModalProps> = () => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-[#f4f4f4] absolute top-0 bottom-0 right-0 left-0">
      <img src={loader} className="w-8" />
    </div>
  );
};

export default Modal;
