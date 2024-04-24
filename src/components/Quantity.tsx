import React, { useState, useMemo } from "react";
import minus from "/svgs/minus.svg";
import plus from "/svgs/plus.svg";
import { useExhibit } from "../state";

interface QuantityProps {
  id: string;
  onChange: (val: number) => void;
}

const Quantity: React.FC<QuantityProps> = ({ id, onChange }) => {
  // const quantity = useExhibit((state) => state.quantity);
  const items = useExhibit((state) => state.items);
  const quantity = useMemo(() => {
    const matchingItem = items.find((item) => item.id === id);

    return matchingItem ? matchingItem.quantity : 1;
  }, [items]);
  const [value, setValue] = useState<number>(quantity);

  const handleIncrement = () => {
    // setValue((prev) => prev + 1);
    // onChange(value + 1);
    setValue((prev) => {
      const newValue = prev + 1;
      onChange(newValue);
      return newValue;
    });
  };

  const handleDecrement = () => {
    if (value > 1) {
      // setValue((prev) => prev - 1);
      // onChange(value - 1);
      setValue((prev) => {
        const newValue = prev - 1;
        onChange(newValue);
        return newValue;
      });
    }
  };

  return (
    <div className="flex gap-6 items-center mt-8">
      <button
        className="w-6 h-6 flex justify-center items-center font-medium bg-gray-300 rounded-full"
        onClick={handleDecrement}
      >
        <img src={minus} className="w-4" />
      </button>
      <p className="w-6 text-center text-xs">{quantity}</p>
      <button
        className="w-6 h-6 flex justify-center items-center font-medium bg-gray-300 rounded-full"
        onClick={handleIncrement}
      >
        <img src={plus} className="w-4" />
      </button>
    </div>
  );
};

export default Quantity;
