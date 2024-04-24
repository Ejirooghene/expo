import React from "react";
// import heart from "/svgs/heart.svg";
import ActionBtn from "./ActionBtn";
import { useProfile } from "../state";

interface GridProps {
  data: IExhibit[];
}

const Grid: React.FC<GridProps> = ({ data }) => {
  const info = useProfile((state) => state.info);

  return (
    <div className="w-full px-14 py-5 mx-auto mb-10 gap-2 columns-4 space-y-2">
      {data.map((item, index) => (
        <div
          key={index.toString()}
          className="flex justify-center p-2 group relative bg-gray-50"
        >
          {/* Image */}
          <img
            alt="gallery"
            className="transition-all duration-100 cursor-pointer filter group-hover:grayscale"
            src={item.imageUrl}
            loading="lazy"
          />

          {/* Overlay */}
          <div className="hidden flex-col justify-between bg-black bg-opacity-70 absolute top-0 bottom-0 right-0 left-0 group-hover:flex">
            <div className="flex justify-between items-center p-3">
              <p className="text-white text-sm">
                <sup className="text-xs">₦</sup>
                {item.price.toLocaleString()}
              </p>
              <div className="flex items-center">
                <button className="inline-flex w-10 h-10 justify-center items-center bg-white mr-2 rounded-md cursor-pointer">
                  <ActionBtn
                    payload={{
                      userId: info._id,
                      itemId: item._id,
                      category: item.category,
                    }}
                    price={item.price}
                  />
                </button>
                <button className="inline-flex w-10 h-10 bg-white rounded-md cursor-pointer overflow-hidden">
                  <ActionBtn
                    type="cart"
                    payload={{
                      userId: info._id,
                      itemId: item._id,
                      category: item.category,
                    }}
                    price={item.price}
                  />
                </button>
              </div>
            </div>
            <div className="text-white px-4 pb-2">
              <p className="text-xs text-gray-400">By {item.seller}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Grid;
