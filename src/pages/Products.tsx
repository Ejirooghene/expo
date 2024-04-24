import React, { useState } from "react";
import logo from "/images/logo.png";
import cartplus from "/svgs/cartplus.svg";
import { useNavigate } from "react-router-dom";
import {
  Footer,
  Modal,
  ProductGrid,
  Retry,
  Search,
  Badge,
} from "../components";
import { getOfflineExhibition } from "../domain";
import { useOfflineExhibit } from "../state";

interface ProductsProps {}

const Products: React.FC<ProductsProps> = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState<string>("");

  const { data, isLoading, isError, refetch } = getOfflineExhibition();


  const items = useOfflineExhibit((state) => state.items);

  if (isLoading) {
    return <Modal />;
  }

  if (isError) {
    return <Retry refetch={refetch} />;
  }

  return (
    <div className="">
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
        <div>
          <button
            className="flex gap-2 items-center cursor-pointer"
            onClick={() => navigate("/cart")}
          >
            <div className="relative">
              <Badge num={items.length} />
              <img src={cartplus} className="w-7" />
            </div>
            <p className="font-bold">Cart</p>
          </button>
        </div>
      </div>

      {/* GRID */}
      <ProductGrid data={data} search={search} />
      <Footer />
    </div>
  );
};

export default Products;
