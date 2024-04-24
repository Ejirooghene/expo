import React from "react";

interface RetryProps {
  refetch: () => void;
}

const Retry: React.FC<RetryProps> = ({ refetch }) => {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <p>An error occurred</p>
      <button className="text-blue-500" onClick={() => refetch()}>
        Please kindly retry
      </button>
    </div>
  );
};

export default Retry;
