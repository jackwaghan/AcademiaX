"use client";
import { useUser } from "@/lib/zustand";
import React from "react";

const Button = () => {
  const { logout } = useUser();

  return (
    <button
      onClick={() => logout()}
      className=" bg-blue-500 rounded text-background px-3 py-1 cursor-pointer hover:bg-blue-400  font-semibold hover:scale-95 transition-all duration-300"
    >
      Authenticate
    </button>
  );
};

export default Button;
