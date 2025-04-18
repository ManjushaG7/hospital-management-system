import React from 'react';
import HashLoader from 'react-spinners/HashLoader';

const Loading = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen bg-gray-100">
      <HashLoader color="#0067FF" />
    </div>
  );
};

export default Loading;
