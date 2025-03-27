"use client";
import { useUser } from "@/lib/zustand";
import { Planner } from "@/Types/type";
import React from "react";

const PlannerLayout = ({
  children,
  data,
}: {
  children: React.ReactNode;
  data: Planner;
}) => {
  React.useEffect(() => {
    useUser.setState({ planner: data });
  }, [data]);

  return <>{children}</>;
};

export default PlannerLayout;
