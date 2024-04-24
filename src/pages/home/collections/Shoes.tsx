import React from 'react';
import { Recommendation, Grid, Modal, Retry } from '../../../components';
import { getExhibition } from '../../../domain';

interface educationProps {
 
};

const education: React.FC<educationProps> = () => {
  const { data, isLoading, isError, refetch } = getExhibition("shoes");

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
          <span className="text-white">Shoes</span>
          <p className="text-3xl font-thin mt-2">
            Shoes
          </p>
          <p className="text-sm text-white font-light mt-5">
          Step into sophistication with our stunning array of footwear, each pair a testament to timeless style and unparalleled craftsmanship.
          </p>
        </p>
      </div>
      <Recommendation />
      <Grid data={data} />
    </div>
  );
};

export default education;