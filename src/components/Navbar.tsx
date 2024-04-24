import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import search from "/svgs/search.svg";
import chevdown from "/svgs/chevdown.svg";
import logo from "/images/logo.png";
import user from "/svgs/usercircle.svg";
import chev from "/svgs/chevdown.svg";
import cartplus from "/svgs/cartplus.svg";
import pic from "/svgs/pic.svg";
import heart from "/svgs/heart.svg";
import { useProfile, useLen, useExhibit } from "../state";
import Badge from "./Badge";
import { categories } from "../pages/home/collections/data";

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const curr = location.pathname.split("/")[2];

  // states
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [category, setCategory] = useState<string>("Arts");

  // zustand
  const info = useProfile((state) => state.info);
  const clearProfile = useProfile((state) => state.clearProfile);
  const cartLen = useLen((state) => state.cartLen);
  const favLen = useLen((state) => state.favLen);
  // const addFavData = useData((state) => state.addFavData);
  const quantity = useExhibit((state) => state.quantity);
  const clearExhibit = useExhibit((state) => state.clearExhibit);

  const handleSignOut = () => {
    clearProfile();
    clearExhibit();
    localStorage.removeItem("exhibit");
    navigate("/auth");
  };

  return (
    <div className="text-sm px-10">
      <div className="flex justify-between items-center py-5">
        <div className="flex items-center gap-10">
          {/* logo */}
          <div
            className="flex items-center cursor-pointer"
            onClick={() => navigate("/dashboard/collections/arts")}
          >
            <img src={logo} className="h-12" loading="lazy" />
            <p className="w-56 text-sm text-[#824D77] font-bold ml-1">
              FUTA Centre for Entrepreneurship (CENT)
            </p>
          </div>

          {/* search input */}
          <div className="w-fit h-12 flex bg-gray-50 border border-gray-300 pr-3 py-2 rounded-md relative">
            {(curr === "favorite" || curr === "cart") && (
              <button
                className="w-fit h-full flex justify-between items-center gap-1 text-gray-500 px-2 border-r border-r-gray-300 cursor-pointer"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <img src={pic} className="w-6" />
                <p>{category}</p>
                <img src={chevdown} className="w-6" />
              </button>
            )}
            <input
              type="text"
              placeholder="Search..."
              className="w-80 text-xs pl-4  bg-transparent outline-none"
            />
            <div className="flex items-center px-3">
              <img src={search} className="w-4" />
            </div>
            {showDropdown && (
              <div className="h-fit bg-white border absolute py-1 mt-12 right-[50%] top-0 left-0 bottom-0 rounded-lg z-20">
                {categories.map((category) => (
                  <p
                    className="text-xs px-3 py-2 cursor-pointer hover:bg-[#e9ecef]"
                    onClick={() => {
                      setCategory(category);
                      setShowDropdown(false);
                      navigate(
                        `/dashboard/collections/${category
                          .split(" ")
                          .join("-")
                          .toLowerCase()}`
                      );
                    }}
                  >
                    {category}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-12">
          {/* Favorite */}
          <button
            className="flex gap-2 items-center cursor-pointer"
            onClick={() => navigate("favorite")}
          >
            <div className="relative">
              <Badge num={favLen} />
              <img src={heart} className="w-6" />
            </div>
            <p className="font-bold">Favorite</p>
          </button>

          {/* Cart */}
          <button
            className="flex gap-2 items-center cursor-pointer"
            onClick={() => navigate("cart")}
          >
            <div className="relative">
              <Badge num={quantity || cartLen} />
              <img src={cartplus} className="w-7" />
            </div>
            <p className="font-bold">Cart</p>
          </button>

          {/* Profile */}
          <div className="group flex gap-2 items-center cursor-pointer relative">
            <img src={user} className="w-7" />
            <p className="font-medium">{info.username}</p>
            <img src={chev} className="w-6" />
            <div className="h-10 absolute right-0 left-0 bottom-0 top-0" />
            <div className="w-fit hidden flex-col bg-white border border-gray-300 p-5 mt-9 absolute top-0 right-0 rounded-md group-hover:flex before:absolute before:w-4 before:bg-white before:h-4 before:border-t before:border-t-gray-300 before:border-l before:border-l-gray-300 before:rounded-ss-[3px] before:rounded-sm before:rotate-45 before:right-4 before:-top-[9px] divide-y divide-gray-200 z-10">
              <p className="text-gray-400 text-xs pb-2">{info.email}</p>
              <button
                className="text-start text-xs pt-2 hover:font-bold"
                onClick={handleSignOut}
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
