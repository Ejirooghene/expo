import React, { useLayoutEffect, useState } from "react";
import { Footer, Modal, Navbar, Retry } from "../../components";
import { Outlet } from "react-router-dom";
import {
  useLen,
  useData,
  useProfile,
  useExhibit,
} from "../../state";
import {getCart, getFavorites } from "../../domain";
import { Item } from "../../state";

interface DashboardProps {}

const transform = (data: any[]): Item[] => {
  if (!data) {
    return [];
  }

  const transformedData = data.map((item: any) => ({
    id: item._id,
    price: item.price,
    quantity: 1,
  }));

  return transformedData;
};

const Dashboard: React.FC<DashboardProps> = () => {
  const [isLoading, setIsLoading] = useState(true);
  const setFavLen = useLen((state) => state.setFavLen);
  const setCartLen = useLen((state) => state.setCartLen);
  const addFavData = useData((state) => state.addFavData);
  const addCartData = useData((state) => state.addCartData);
  const addItem = useExhibit((state) => state.addItem);
  const id = useProfile((state) => state.info._id);

  const {
    data: favData,
    isLoading: favIsLoading,
    isError: favError,
    refetch,
  } = getFavorites(id);

  const {
    data: cartData,
    isLoading: cartIsLoading,
    isError: cartError,
  } = getCart(id) 

  useLayoutEffect(() => {
    if (favData && cartData) {
      const result = transform(cartData);
      addFavData(favData);
      addCartData(cartData);
      setFavLen(favData.length);
      setCartLen(cartData.length);
      addItem(result);
      setIsLoading(false);
    }
  }, [favData, cartData]);


  if (isLoading || favIsLoading || cartIsLoading) {
    return <Modal />;
  }

  if (favError || cartError) {
    return <Retry refetch={refetch} />;
  }

  return (
    <div className="">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Dashboard;
