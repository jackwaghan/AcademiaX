import React from "react";
import { Loader } from "./components/loader";

export default function Loading() {
  return (
    <div className="flex w-dvw h-dvh items-center justify-center ">
      <Loader className="h-10 w-10 text-blue-400" />
    </div>
  );
}
