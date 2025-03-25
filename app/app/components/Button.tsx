"use client";
import { useUser } from "@/lib/zustand";
import React from "react";

const Button = ({ status }: { status: string }) => {
  const { logout } = useUser();

  return (
    <button
      onClick={() => {
        if (status === "401") {
          window.location.reload();

          return;
        }
        if (status === "403") {
          logout();

          return;
        }
        if (status === "500") {
          window.location.reload();
          return;
        }
      }}
      className=" bg-blue-500 rounded text-background px-3 py-1 cursor-pointer hover:bg-blue-400  font-semibold hover:scale-95 transition-all duration-300"
    >
      {status === "401" ? "Reload" : status === "403" ? "Login" : "Retry"}
    </button>
  );
};

export default Button;
