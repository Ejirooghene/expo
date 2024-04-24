import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addPreferences } from "../../domain";
import { useProfile } from "../../state";

interface PrefenceProps {}

const catogories = [
  "art",
  "fashion",
  "Bags/purses",
  "Shoes/slippers",
  "furniture",
  "Personal care products",
  "fashion designing",
  "others",
];

const Prefence: React.FC<PrefenceProps> = () => {
  // states
  const [preferences, setPreferences] = useState<string[]>([]);

  // zustand
  const userId = useProfile((state) => state.info._id);
  // const items = useOfflineExhibit((state) => state.items);
  // const clearExhibit = useOfflineExhibit((state) => state.clearExhibit);
  // const id = useProfile((state) => state.info._id);

  const navigate = useNavigate();

  // apis
  const { mutate, isLoading } = addPreferences();
  // const { mutate: addCartMutate,  } = addCart();

  const handlePreference = (val: string) => {
    setPreferences((prev) => {
      if (prev.length === 5) return prev;

      const foundIndex = prev.findIndex((item) => item === val);

      if (foundIndex === -1) {
        return [...prev, val];
      }

      return prev;
    });
  };

  const removePreference = (val: string) => {
    setPreferences((prev) => {
      const newItems = prev.filter((item) => item !== val);

      return newItems;
    });
  };

  const handleSubmit = async () => {
    // Execute both mutations simultaneously
      mutate(
        { userId, preferences },
        {
          onSuccess: () => {
            navigate("/dashboard/collections/arts");
          },
        }
      // ),
      // addCartMutate(
      //   { userId: id, itemId: ids },
      //   {
      //     onSuccess: () => {
      //       clearExhibit();
      //       navigate("/dashboard/collections/arts");
      //     },
      //   }
      // ),
    );
  };

  return (
    <div className="h-screen px-16 py-10 relative">
      <h2 className="text-2xl font-bold mb-4">Choose Your Preferences</h2>
      <p className="text-sm">
        Select from a range of categories ( At most 5 ) to tailor your
        personalized experience and discover content that resonates with your
        interests and tastes.
      </p>
      <div className="flex flex-wrap gap-5 mt-10">
        {catogories.map((category, index) => (
          <button
            key={index.toString()}
            className="text-white text-xs bg-[#824D77] px-4 py-2 rounded-full cursor-pointer hover:shadow-md"
            onClick={() => handlePreference(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-5 pt-8 mt-10 border-t border-gray-200">
        {preferences.map((item, index) => (
          <p
            key={index.toString()}
            className="flex gap-1 items-center text-[#824D77] text-xs bg-[#824D77] bg-opacity-35 px-4 py-[6px] rounded-full hover:shadow-md"
          >
            {item}
            <img
              src="/svgs/cancel.svg"
              className="w-5 cursor-pointer"
              onClick={() => removePreference(item)}
            />
          </p>
        ))}
      </div>
      <button
        disabled={preferences.length === 0 || isLoading}
        className="w-40 flex justify-center text-sm px-10 py-2 mt-16 border border-black rounded-md disabled:text-gray-300 disabled:border-gray-300 disabled:cursor-not-allowed absolute bottom-10"
        onClick={handleSubmit}
      >
        {isLoading ? <img src="/svgs/loader.svg" /> : "Continue"}
      </button>
    </div>
  );
};

export default Prefence;
