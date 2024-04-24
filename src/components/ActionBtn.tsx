import React, { useEffect, useMemo, useState } from "react";
import loader from "/svgs/loader.svg";
import cart from "/svgs/cart.svg";
import cartplus from "/svgs/cartplus.svg";
import heart from "/svgs/heart.svg";
import hearted from "/svgs/hearted.svg";
import { addCart, addFavorite, addPreferences } from "../domain";
import { useLen, useData, useExhibit, useProfile } from "../state";

interface LoaderProps {
  type?: string;
  payload: {
    userId: string;
    itemId: string;
    category: string
  };
  price: number;
}

const Loader: React.FC<LoaderProps> = ({ type, payload, price }) => {
  // mutations
  const { mutate: favMutate, isLoading: favIsLoading } = addFavorite();
  const { mutate: cartMutate, isLoading: cartIsLoading } = addCart();

  // states
  const { mutate: preferenceMutate } = addPreferences();
  const { setFavLen, setCartLen } = useLen((state) => state);
  const { favData, cartData, addFavData, addCartData } = useData((state) => state);
  const {items, addItem, removeItem, addTotal} = useExhibit(state => state)
  const userId = useProfile(state => state.info._id);

  const fav = useMemo(() => {
    return favData?.map((item) => item._id);
  }, [favData]);

  const kart = useMemo(() => {
    return cartData?.map((item) => item._id);
  }, [cartData]);

  const handleCart = () => {
    cartMutate(payload, {
      onSuccess: (data) => {
        const cartData = data.data;
        addCartData(cartData);
        setCartLen(cartData.length);
        preferenceMutate({userId, preferences: [payload.category]})
  
        const foundItem = items.find(item => item.id === payload.itemId);
  
        if (foundItem) {
          removeItem(payload.itemId);
        } else {
          addItem({
            id: payload.itemId,
            price,
            quantity: 1
          });
        }
  
        addTotal();
      },
    });
  };
  

  const handleFav = () => {
    favMutate(payload, {
      onSuccess: (data) => {
        addFavData(data.data);
        setFavLen(data.data.length);
        preferenceMutate({userId, preferences: [payload.category]})
      },
    });
  };

  if (favIsLoading || cartIsLoading) {
    return (
      <span className="inline-flex w-10 h-10 justify-center items-center rounded-md">
        <img src={loader} />
      </span>
    );
  }

  if (type === "cart") {
    return (
      <span
        className="inline-flex w-full h-full flex- justify-center items-center"
        onClick={handleCart}
      >
        {kart?.includes(payload.itemId) ? (
          <img src={cart} title="Added to cart" className="w-[24px]" />
        ) : (
          <img src={cartplus} title="Add to cart" className="w-6" />
        )}
      </span>
    );
  }

  return (
    <span
      className="inline-flex w-full h-full justify-center items-center rounded-md"
      onClick={handleFav}
    >
      {fav?.includes(payload.itemId) ? (
        <img src={hearted} className="w-6" title="Added to favorite" />
      ) : (
        <img src={heart} className="w-6" title="Add to favorite" />
      )}
    </span>
  );
};

export default Loader;
