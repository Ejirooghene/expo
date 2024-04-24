import React, { useEffect, useState, useMemo } from "react";
import cart from "/svgs/cartplus.svg";
import heart from "/svgs/heart.svg";
import hearted from "/svgs/hearted.svg";
import trash from "/svgs/trash.svg";
import at from "/svgs/at.svg";
import { usePaystackPayment } from "react-paystack";
import { Quantity } from "../../components";
import { useLen, useExhibit, useData, useProfile } from "../../state";
import { addPurchase, removeCart } from "../../domain";

interface CartProps {}

const Cart: React.FC<CartProps> = () => {
  const [curr, setCurr] = useState<string>("");
  const { mutate, isLoading } = removeCart();
  const { mutate: purchaseMutate } = addPurchase();

  const data = useData((state) => state.cartData);
  const addCartData = useData((state) => state.addCartData);
  const total = useExhibit((state) => state.total);
  const items = useExhibit(state => state.items);
  const quantity = useExhibit((state) => state.quantity);
  const updateItem = useExhibit((state) => state.updateItem);
  const removeItem = useExhibit((state) => state.removeItem);
  const addTotal = useExhibit((state) => state.addTotal);
  const favData = useData((state) => state.favData);
  const setCartLen = useLen((state) => state.setCartLen);
  const id = useProfile((state) => state.info._id);
  const email = useProfile(state => state.info.email)

  useEffect(() => {
    addTotal();
  }, []);

  const fav = useMemo(() => {
    return favData.map((item) => item._id);
  }, [favData]);

  const config = {
    reference: new Date().getTime().toString(),
    email: email,
    amount: total * 100,
    publicKey: "pk_test_1a220028474dec20a11b3506de943e3b2c796555",
  };

  const handleDel = (info: { userId: string; itemId: string }) => {
    setCurr(info.itemId);
    mutate(info, {
      onSuccess: (data) => {
        setCartLen(data.data.length);
        addCartData(data.data);
        removeItem(info.itemId);
        addTotal();
      },
    });
  };

  const onSuccess = () => {
    // Implementation for whatever you want to do with reference and after success call.
    const itemIds = items.map(item => item.id);
    purchaseMutate({userId: id, itemIds}, {
      onSuccess: data => {
        // console.log("purchase data", data.data)
        addCartData(data.data);
        setCartLen(data.data.length);
        removeItem("")
      }
    });
  };

  const onClose = () => {
    
  };

  const initializePayment: any = usePaystackPayment(config);

  if (data.length === 0) {
    return (
      <div className="h-screen bg-gray-50 px-32 py-10">
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
    );
  }

  return (
    <div className="min-h-full flex gap-5 bg-[#E5E7E6] px-12 pt-5 pb-36">
      {/*  LEFT SIDE  */}
      <div className="w-2/3 h-full">
        <div className="bg-white px-5 py-4 rounded-md">
          <p className="text-lg font-bold">
            Shopping Cart{`(${quantity || data.length})`}
          </p>
        </div>

        {/* LIST OF ORDERS */}
        {data.map((item, index) => (
          <div
            className="h-fit flex flex-col justify-between bg-white px-5 rounded-md mt-5 pb-5 hover:shadow-lg"
            key={index.toString()}
          >
            <div className="">
              {/* SELLER */}
              <div className="flex gap-24 py-4 border-b border-b-gray-100">
                <div className="flex items-center gap-4 mt-1">
                  <p className="text-sm">
                    Seller: <span className="text-gray-500">{item.seller}</span>
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
                <div className="w-36 h-28 bg-contain bg-top bg-no-repeat" style={{backgroundImage: `url(${item.imageUrl})`}} />
                <div className="w-full">
                  <p className="text-sm px-4 text-left">{item.desc}</p>
                  <p className="text-sm px-4 mt-3">
                    <span className="text-red-500">Price:</span> NGN ₦{" "}
                    {item.price.toLocaleString()}
                  </p>
                </div>
                <div className="flex flex-col items-end">
                  <div className="flex gap-4">
                    {fav.includes(item._id) ? (
                      <img
                        src={hearted}
                        className="w-5"
                        title="Added to favorite"
                      />
                    ) : (
                      <img
                        src={heart}
                        className="w-5"
                        title="Not added to favorite"
                      />
                    )}
                    { 
                    isLoading && curr === item._id ? <p className="text-xs">deleting...</p> :
                    <div
                      onClick={() => {
                        handleDel({ userId: id, itemId: item._id })
                      }}
                      className="cursor-pointer"
                    >
                      <img
                        src={trash}
                        className="w-5"
                        title="Remove from cart"
                      />
                    </div>
                    }
                  </div>
                  <Quantity
                    id={item._id}
                    onChange={(val) => {
                      updateItem(item._id, val);
                      addTotal();
                    }}
                  />
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
            onClick={() => {
              initializePayment(onSuccess, onClose);
            }}
          >
            Checkout {quantity} item{quantity > 1 ? "s" : ""}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
