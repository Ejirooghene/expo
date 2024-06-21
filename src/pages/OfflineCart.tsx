import React, { useEffect, useState } from "react";
import cart from "/svgs/cartplus.svg";
import trash from "/svgs/trash.svg";
import logo from "/images/logo.png";
import cartplus from "/svgs/cartplus.svg";
import at from "/svgs/at.svg";
import market from "/svgs/market.svg";
import { useNavigate } from "react-router-dom";
import { Footer, Search, Badge } from "../components";
import { useOfflineExhibit } from "../state";

interface CartProps {}

const Cart: React.FC<CartProps> = () => {
  const navigate = useNavigate();
  const [, setSearch] = useState<string>("");

  const items = useOfflineExhibit((state) => state.items);
  const total = useOfflineExhibit((state) => state.total);
  const quantity = useOfflineExhibit((state) => state.quantity);
  const addTotal = useOfflineExhibit((state) => state.addTotal);
  const removeItem = useOfflineExhibit((state) => state.removeItem);
  // const updateItem = useOfflineExhibit((state) => state.updateItem);

  useEffect(() => {
    addTotal();
  }, [items]);

  if (items.length === 0) {
    return (
      <>
        {/* HEADER */}
        <div className="w-full flex justify-between items-center bg-white px-16 py-4 border-b fixed z-10">
          {/* logo  */}
          <div
            className="flex items-center cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img src={logo} className="h-12" loading="lazy" />
            <p className="w-[180px] text-sm text-[#824D77] font-bold ml-1">
              FUTA Centre for Entrepreneurship (CENT)
            </p>
          </div>

          {/* search */}
          <Search onSearch={(val) => setSearch(val.toLowerCase())} />

          {/* cart */}
          <div className="flex gap-5">
            <button
              className="flex gap-2 items-center cursor-pointer"
              onClick={() => navigate("/cart")}
            >
              <div className="relative">
                <Badge num={quantity || items.length} />
                <img src={cartplus} className="w-7" />
              </div>
              <p className="text-sm font-bold">Cart</p>
            </button>

            {/* marketplace button */}
            <div
              className="bg-[#824D77] px-6 py-3 cursor-pointer rounded-full hover:shadow-md"
              onClick={() => navigate("/products")}
            >
              <button className="flex gap-2 text-white text-sm">
                <img src={market} className="w-5" />
                <p>Marketplace</p>
              </button>
            </div>
          </div>
        </div>

        {/* BODY */}
        <div className="h-full bg-gray-50 px-32 pt-36 pb-10">
          <div className=" flex flex-col gap-5 items-center bg-transparent p-16 border-4 border-[#824D77] rounded-lg">
            <div className="w-36 h-36 flex justify-center items-center bg-gray-100 rounded-full">
              <img src={cart} className="w-20" />
            </div>
            <p className="text-base font-medium">Your exposure cart is empty</p>
            <p className="text-sm font-li∫ght">
              Browse our categories and discover our best deals!
            </p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <div>
      {/* HEADER */}
      <div className="w-full flex justify-between items-center bg-white px-16 py-4 border-b fixed z-10">
        {/* logo  */}
        <div
          className="flex items-center cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src={logo} className="h-12" loading="lazy" />
          <p className="w-[180px] text-sm text-[#824D77] font-bold ml-1">
            FUTA Centre for Entrepreneurship (CENT)
          </p>
        </div>

        {/* search */}
        <Search onSearch={(val) => setSearch(val.toLowerCase())} />

        {/* cart */}
        <div className="flex gap-5">
          <button
            className="flex gap-2 items-center cursor-pointer"
            onClick={() => navigate("/cart")}
          >
            <div className="relative">
              <Badge num={quantity || items.length} />
              <img src={cartplus} className="w-7" />
            </div>
            <p className="text-sm font-bold">Cart</p>
          </button>

          {/* marketplace button */}
          <div
            className="bg-[#824D77] px-6 py-3 cursor-pointer rounded-full hover:shadow-md"
            onClick={() => navigate("/products")}
          >
            <button className="flex gap-2 text-white text-sm">
              <img src={market} className="w-5" />
              <p>Marketplace</p>
            </button>
          </div>
        </div>
      </div>

      <div className="min-h-full flex gap-5 bg-[#E5E7E6] px-12 pt-28 pb-36">
        {/*  LEFT SIDE  */}
        <div className="w-2/3 h-full">
          <div className="bg-white px-5 py-4 rounded-md">
            <p className="text-lg font-bold">
              Shopping Cart{`(${quantity || items.length})`}
            </p>
          </div>

          {/* LIST OF ORDERS */}
          {items.map((item, index) => (
            <div
              className="h-fit flex flex-col justify-between bg-white px-5 rounded-md mt-5 pb-5 hover:shadow-lg"
              key={index.toString()}
            >
              <div className="">
                {/* SELLER */}
                <div className="flex gap-24 py-4 border-b border-b-gray-100">
                  <div className="flex items-center gap-4 mt-1">
                    <p className="text-sm">
                      {/* Seller:{" "}
                      <span className="text-gray-500">{item.seller}</span> */}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 mt-1">
                    <img src={at} className="w-5" />
                    <p className="text-sm">Contact</p>
                  </div>
                </div>

                {/* PRODUCT */}
                <div className="flex justify-between pt-5">
                  {/* <img src={item.imageUrl} className="w-28 h-28 rounded-md" /> */}
                  <div
                    className="w-36 h-28 bg-contain bg-top bg-no-repeat"
                    style={{ backgroundImage: `url(${item.imageUrl})` }}
                  />
                  <div className="w-full">
                    <p className="text-sm px-4 text-left">{item.desc}</p>
                    <p className="text-sm px-4 mt-3">
                      <span className="text-red-500">Price:</span> NGN ₦{" "}
                      {item.price.toLocaleString()}
                    </p>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="flex gap-4">
                      <div
                        onClick={() => removeItem(item.id)}
                        className="cursor-pointer"
                      >
                        <img
                          src={trash}
                          className="w-5"
                          title="Remove from cart"
                        />
                      </div>
                    </div>
                    {/* <OfflineQuantity
                      id={item.id}
                      onChange={(val) => {
                        updateItem(item.id, val);
                        addTotal();
                      }}
                    /> */}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT SIDE */}
        <div className="w-1/3 h-full sticky top-5">
          <div className=" bg-white p-5 rounded-md static -top-64">
            <p className="text-lg font-bold mb-8">Order Summary</p>
            <div className="flex justify-between font-medium mt-4">
              <p>Total</p>
              <p>NGN ₦ {total.toLocaleString()}</p>
            </div>
            <button
              className="w-full text-xs text-white text-center bg-[#824D77] bg-opacity-90 px-3 py-3 mt-6 rounded-md hover:shadow-lg hover:bg-opacity-100 disabled:bg-gray-300 disabled:shadow-none"
              // disabled={items === 0}
              onClick={() => navigate("/auth")}
            >
              Checkout {quantity} item{quantity > 1 ? "s" : ""}
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
