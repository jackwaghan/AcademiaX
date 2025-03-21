"use client";

import { useWindow } from "@/lib/hook";
import { useUser } from "@/lib/zustand";
import React from "react";
import {
  Radar,
  RadarChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
} from "recharts";
import Error from "../../components/Error";

export default function App() {
  const isMobile = useWindow();
  const { attendance } = useUser();
  const [width, setWidth] = React.useState(500);
  const [height, setHeight] = React.useState(500);
  React.useEffect(() => {
    if (isMobile && isMobile !== undefined) {
      setWidth(500);
      setHeight(400);
    }
  }, [isMobile]);
  if (attendance === null) return <Error error="Attendance not found" />;
  const filteredAttendance = attendance.map((item) => {
    return {
      subject: item.code,
      percentage: Number(Number(item.percetage).toFixed()),
    };
  });
  return (
    <RadarChart width={width} height={height} data={filteredAttendance}>
      <PolarGrid className="stroke-foreground/20" />
      <PolarAngleAxis
        dataKey=""
        className="text-gray-700 font-semibold text-xl"
        tick={{ fill: "#4b5563", fontSize: 20 }}
      />
      <PolarRadiusAxis
        tick={{ fill: "#FF6900", fontSize: 16 }}
        domain={[0, 100]}
        allowDataOverflow
        angle={175}
      />
      <Radar
        dataKey="percentage"
        fill="#4f46e5" // Modern blue color
        fillOpacity={0.6}
        stroke="#4f46e5"
        strokeWidth={2}
      />
    </RadarChart>
  );
}
