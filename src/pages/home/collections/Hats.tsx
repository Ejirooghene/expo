import React from 'react';
import { Recommendation, Grid, Modal, Retry } from "../../../components";
import { getExhibition } from "../../../domain";


interface TechnologyProps {
 
};

const Technology: React.FC<TechnologyProps> = () => {
  const { data, isLoading, isError, refetch } = getExhibition("hats");

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
          <span className="text-white">Hat Design</span>
          <p className="text-3xl font-thin mt-2">
            Hat Design
          </p>
          <p className="text-sm text-white font-light mt-5">
          Discover the latest trends, timeless classics, and everything in between. 
          </p>
        </p>
      </div>
      <Recommendation />
      <Grid data={data} />
    </div>
  );
};

export default Technology;