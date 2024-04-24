import React, { useEffect, useState } from "react";
import check from "/svgs/check.svg";
import checked from "/svgs/checked.svg";
import { useSelect } from "../state";

interface CheckboxProps {
  isChecked?: (val: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ isChecked }) => {
  const { selectAll, toggleSelectAll } = useSelect((state) => state);

  const [toggle, setToggle] = useState<boolean>(false);

  useEffect(() => {
    setToggle(selectAll);
    if (isChecked) {
      isChecked(selectAll);
    }
  }, [selectAll]);

  const handleClick = () => {
    if(selectAll) toggleSelectAll()
    setToggle((prevToggle) => {
      if (isChecked) {
        isChecked(!prevToggle);
      }
      return !prevToggle;
    });
  };

  return (
    <button className="" onClick={handleClick}>
      {toggle ? (
        <img src={checked} className="w-5" />
      ) : (
        <img src={check} className="w-5" />
      )}
    </button>
  );
};

export default Checkbox;
