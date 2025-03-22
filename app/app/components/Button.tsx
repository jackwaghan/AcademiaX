"use client";
import { useRouter } from "next/navigation";
import React from "react";

const Button = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/auth/logout");
  };
  return (
    <button
      onClick={() => handleClick()}
      className=" bg-blue-500 rounded text-background px-3 py-1 cursor-pointer hover:bg-blue-400  font-semibold hover:scale-95 transition-all duration-300"
    >
      Authenticate
    </button>
  );
};

export default Button;
