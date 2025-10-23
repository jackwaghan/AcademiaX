"use client";
import { useUserInfo } from "@/hooks/query";
import React from "react";
import { UserInfo } from "@jackwaghan/srm-academia-api";
import { GlobalLoader } from "../components/loader";

const Page = () => {
  const { data, isPending } = useUserInfo();
  if (isPending) return <GlobalLoader className="h-10 w-10 text-blue-400" />;
  if (!data)
    return (
      <div className="flex h-full w-full justify-center items-center">
        No data found
      </div>
    );

  return <Data data={data} />;
};

export default Page;

const Data = ({ data }: { data: UserInfo }) => {
  return (
    <div className="w-full flex flex-col items-center py-15 text-sm px-6">
      <div className="flex flex-col w-full max-w-sm items-center gap-6 ">
        <div className="flex flex-col items-center gap-2 w-full">
          <div className="w-24 h-24 apply-border-md background-rounded  flex items-center justify-center mb-2 bg-[#1B1D21] shadow-2xl ">
            <span className="text-4xl font-bold text-white/80">
              {data.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()}
            </span>
          </div>
          <h1 className="text-2xl font-semibold text-blue-400">{data.name}</h1>
          <span>{data.department}</span>
        </div>
        <div className="w-full flex flex-col gap-4 bg-background rounded-lg px-4 py-4 border-dotted border-white/10 border-2 ">
          <ProfileRow label="Reg. Number" value={data.regNumber} />
          <ProfileRow label="Mobile" value={data.mobile} />
          <ProfileRow label="Semester" value={data.semester} />
          <ProfileRow label="Section" value={data.section} />
        </div>
      </div>
    </div>
  );
};

const ProfileRow = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => (
  <div className="flex justify-between items-center ">
    <span className="text-white/50 text-sm">{label}</span>
    <span className="text-blue-200 font-medium">{value}</span>
  </div>
);
