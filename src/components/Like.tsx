import React, { useState } from "react";
import heart from "/svgs/heart.svg";
import hearted from "/svgs/hearted.svg";

interface CheckboxProps {}

const Checkbox: React.FC<CheckboxProps> = () => {
  const [toggled, setToggled] = useState<boolean>(false);

  return (
    <button className="" onClick={() => {}}>
      {toggled ? (
        <img src={hearted} className="w-5" />
      ) : (
        <img src={heart} className="w-5" />
      )}
    </button>
  );
};

export default Checkbox;
