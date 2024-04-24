import React from "react";
import loader from "/svgs/loader.svg";

interface ButtonProps {
  text: string;
  disabled: boolean;
  isLoading: boolean;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ text, disabled, isLoading, onClick }) => {
  return (
    <button
      type="submit"
      className="w-full h-12 flex justify-center items-center text-sm  bg-[#824D77] bg-opacity-90 text-white mt-7 rounded-md hover:bg-opacity-100 hover:shadow-lg disabled:bg-gray-300 disabled:hover:shadow-none"
      disabled={disabled}
      onClick={onClick}
    >
      {isLoading ? <img src={loader} /> : text}
    </button>
  );
};

export default Button;