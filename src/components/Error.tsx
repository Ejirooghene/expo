import React, { useEffect, useState } from "react";
import error from "/svgs/error.svg";
import close from "/svgs/close.svg";

interface ErrorProps {
  isError: boolean;
  errorMsg: string;
}

const Error: React.FC<ErrorProps> = ({ isError, errorMsg }) => {
  const [show, setShow] = useState<boolean>(isError);

  const handleClose = () => {
    setShow(false);
  };

  useEffect(() => {
    setShow(isError);
  }, [isError])

  return show ? (
    <div className="flex justify-between items-center bg-red-200 p-3 mt-3 border border-red-500 rounded-md ">
      <div className="flex gap-4 items-center">
        <img src={error} className="w-6" alt="error-icon" />
        <p className="text-xs text-[#dc2626]">{errorMsg}</p>
      </div>
      <button className="hover:bg-white rounded-md" onClick={handleClose}>
        <img src={close} className="w-6 justify-self-end" alt="close-icon" />
      </button>
    </div>
  ) : null;
};

export default Error;