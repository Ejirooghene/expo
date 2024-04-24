import React from 'react';
import { getExhibition } from '../../../domain';
import { Recommendation, Grid, Modal, Retry } from '../../../components';

interface cosmeticsProps {
 
};

const cosmetics: React.FC<cosmeticsProps> = () => {
  const { data, isLoading, isError, refetch } = getExhibition("bags");

  if (isLoading) {
    return <Modal />;
  }

  if (isError) {
    return <Retry refetch={refetch} />;
  }
  return (
    <div className="">
       <div className="bg-[#824D77] bg-opacity-30 p-8">
        <p className="text-sm font-bold">
          All Exhibitions <span className="text-white font-bold mx-2">/</span>{" "}
          <span className="text-white">Bags</span>
          <p className=" text-3xl font-thin mt-2">
            Bags
          </p>
          <p className="text-white text-sm font-light mt-5">
          Embrace elegance with our exquisite collection of handcrafted bags, showcasing the artistry of beauty.
          </p>
        </p>
      </div>
      <Recommendation />
      <Grid data={data} />
    </div>
  );
};

export default cosmetics;