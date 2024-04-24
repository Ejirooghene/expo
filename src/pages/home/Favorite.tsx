import React from "react";
import { Grid } from "../../components";
import { useData } from "../../state";
import heart from "/svgs/heart.svg";

interface FavoriteProps {}

const Favorite: React.FC<FavoriteProps> = () => {

  const favData = useData(state => state.favData)

  if(favData.length === 0){
    return (
      <div className="h-screen bg-gray-50 px-32 py-10">
        <div className=" flex flex-col gap-5 items-center bg-transparent p-16 border-4 border-[#824D77] border-solid rounded-lg">
          <div className="w-36 h-36 flex justify-center items-center bg-gray-100 rounded-full">
            <img src={heart} className="w-20" />
          </div>
          <p className="text-base font-medium">Your exposure favorite is empty</p>
          <p className="text-sm font-light">
            Browse our categories and discover our best deals!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full">
      <Grid data={favData} />
    </div>
  );
};

export default Favorite;
