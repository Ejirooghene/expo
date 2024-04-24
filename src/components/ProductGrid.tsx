import React, { useState } from "react";
import { OfflineItem } from "../state";
import { useOfflineExhibit } from "../state";
import check from "/images/check.gif";

interface ProductGripProps {
  search: string;
  data: any[];
}

const transform = (data: any): OfflineItem => {
  return {
    id: data._id,
    desc: data.desc,
    imageUrl: data.imageUrl,
    price: data.price,
    quantity: 1,
  };
};

const ProductGrid: React.FC<ProductGripProps> = ({ search, data }) => {
  const addItem = useOfflineExhibit((state) => state.addItem);
  const [show, setShow] = useState<boolean>(false);
  const [curr, setCurr] = useState<string>("");

  const handleAdd = (item: any) => {
    setShow(true);
    setCurr(item._id);
    addItem(transform(item));
    setTimeout(() => {
      setShow(false);
    }, 1000);
  };

  return (
    <div className="flex flex-wrap justify-between p-10 pt-36 overflow-hidden">
      {data
        .filter(
          (item) =>
            item.category.toLowerCase().includes(search) ||
            item.desc.toLowerCase().includes(search)
        )
        .map((item) => (
          <div
            key={item._id}
            className="group h-[430px] px-5 pt-3 pb-2 mb-10 border border-white rounded-md hover:shadow-lg hover:border-gray-200 relative"
          >
            <p className="text-sm text-[#6c757d] mb-3">
              Category: {item.category}
            </p>
            {/* <img src={item.imageUrl} className="w-64 h-64" /> */}
            <div
              className="w-64 h-64 bg-contain bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${item.imageUrl})` }}
            ></div>
            <p className="w-64 text-sm my-3 line-clamp-2">{item.desc}</p>
            <p className="text-sm">₦{item.price.toLocaleString()}</p>
            <button
              className="hidden w-36 h-12 justify-center items-center  bg-[#824D77] mt-3 rounded-tl-md group-hover:flex absolute bottom-0 right-0"
              onClick={() => handleAdd(item)}
            >
              {show && curr === item._id ? (
                <img src={check} alt="" className="w-12 h-12" />
              ) : (
                <p className="text-sm text-white">Add to cart</p>
              )}
            </button>
          </div>
        ))}
    </div>
  );
};

export default ProductGrid;
// e36414
