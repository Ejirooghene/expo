import React from "react";
import { Recommendation, Grid, Modal, Retry } from "../../../components";
import { getExhibition } from "../../../domain";

interface artsProps {}

const WeldingAndFabs: React.FC<artsProps> = () => {
  const { data, isLoading, isError, refetch } = getExhibition("welding");

  if (isLoading) {
    return <Modal />;
  }

  if (isError) {
    return <Retry refetch={refetch} />;
  }

  return (
    <div>
      <div className="bg-[#824D77] bg-opacity-30 p-8">
        <div className="text-sm font-bold">
          All Exhibitions <span className="text-white font-bold mx-2">/</span>{" "}
          <span className="text-white">Welding And Fabrication</span>
          <p className="text-3xl font-thin mt-2">Welding And Fabrication</p>
          <p className="text-sm text-white font-light mt-5">
            Explore a boundless canvas of artistic expression.
          </p>
        </div>
      </div>
      <Recommendation />
      <Grid data={data} />
    </div>
  );
};

export default WeldingAndFabs;
