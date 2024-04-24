import React from "react";
// import { useLen } from "../state";

interface BadgeProps {
  num: number;
}

const Badge: React.FC<BadgeProps> = ({ num }) => {
  if (num) {
    return (
      <span className="w-4 h-4 flex justify-center items-center text-[8px] text-white bg-red-500 absolute  -right-[2px] rounded-full">
        {num}
      </span>
    );
  }
};

export default Badge;
