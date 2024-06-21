import React from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import { categories } from "./data";

interface MainProps {}

const Main: React.FC<MainProps> = () => {
  const location = useLocation();
  const curr = location.pathname.split("/")[3];

  return (
    <div className="">
      <div className="flex justify-between items-center">
        <div className="flex gap-3 pl-6 py-6">
          {categories.map((category: string) => (
            <NavLink
              key={category}
              className="text-gray-700 text-sm font-medium px-4 py-2 rounded-sm cursor-pointer hover:text-[#824D77]"
              style={{
                color:
                  curr === category.toLowerCase().split(" ").join("-")
                    ? "black"
                    : "",
                backgroundColor:
                  curr === category.toLowerCase().split(" ").join("-")
                    ? "#e9ecef"
                    : "transparent",
              }}
              to={`/dashboard/collections/${category
                .split(" ")
                .join("-")
                .toLowerCase()}`}
            >
              {category}
            </NavLink>
          ))}
        </div>
        <p className="w-fit text-xs px-6 border-l border-l-gray-300">Learn</p>
      </div>
      <div className="h-full relative">
        <Outlet />
      </div>
    </div>
  );
};

export default Main;
