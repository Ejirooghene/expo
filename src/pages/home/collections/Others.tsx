import React from "react";
import { Recommendation, Grid, Modal, Retry } from "../../../components";
import { getExhibition } from "../../../domain";

interface OthersProps {}

const Others: React.FC<OthersProps> = () => {
  const { data, isLoading, isError, refetch } = getExhibition("others");

  if (isLoading) {
    return <Modal />;
  }

  if (isError) {
    return <Retry refetch={refetch} />;
  }
  return (
    <div>
      <div className="bg-[#824D77] bg-opacity-30 p-8">
        <p className="text-sm font-bold">
          All Exhibitions <span className="text-white font-bold mx-2">/</span>{" "}
          <span className="text-white">Others</span>
          <p className="text-3xl font-thin mt-2">Others</p>
          <p className="text-sm text-white font-light mt-5">
            Transform your space with our curated selection of furniture pieces,
            where every item embodies the perfect blend of functionality and
            style.
          </p>
        </p>
      </div>
      <Recommendation />
      <Grid data={data} />
    </div>
  );
};

export default Others;
