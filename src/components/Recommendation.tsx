import React from "react";
import { getRecommendation } from "../domain";
import { useProfile } from "../state";
import ActionBtn from "./ActionBtn";

interface RecommendationProps {}

const Recommendation: React.FC<RecommendationProps> = () => {
  const id = useProfile((state) => state.info._id);
  const { data, isLoading } = getRecommendation(id);

  if (isLoading) {
    return (
      <div className="pl-16 pt-10 pb-5">
        <p>Loading recommendations...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="pl-16 pt-10 pb-5">
        <p>No recommendation</p>
      </div>
    );
  }

  return (
    <div className="px-16 py-5 mb-5">
      {/* <div className="flex gap-6 items-center">
        <p>Trending: </p>
        <div className="w-36 h-10 rounded-full shadow-md hover:shadow-lg"></div>
      </div> */}
      <div className="">
        <p className="mb-4">You might also like</p>
        <div className="flex gap-10">
          {data.map((item: any, index: number) => (
            <div key={index.toString()} className="w-28 h-28 p-1 bg-gray-200">
              <div
                className="group w-full h-full bg-cover bg-center"
                style={{
                  backgroundImage: `url(${item.imageUrl})`,
                }}
              >
                <div className="hidden h-full justify-center items-center group-hover:flex">
                  <button className="inline-flex w-10 h-10 bg-white mr-2 rounded-md cursor-pointer overflow-hidden">
                    <ActionBtn
                      payload={{ userId: id, itemId: item._id, category: item.category }}
                      price={item.price}
                    />
                  </button>
                  <button className="inline-flex w-10 h-10 justify-center items-center bg-white rounded-md cursor-pointer">
                    <ActionBtn
                      type="cart"
                      payload={{ userId: id, itemId: item._id, category: item.category }}
                      price={item.price}
                    />
                  </button>
                </div>
              </div>
              <p className="text-xs mt-2">NGN {item.price.toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Recommendation;
