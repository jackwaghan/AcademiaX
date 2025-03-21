import React from "react";

const Error = ({ error }: { error: string }) => {
  return (
    <div className="w-screen h-screen flex justify-center items-center ">
      {error}
    </div>
  );
};

export default Error;
