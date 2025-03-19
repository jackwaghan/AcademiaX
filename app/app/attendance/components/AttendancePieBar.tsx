"use client";
import { attendance } from "@/lib/data";
import { useWindow } from "@/lib/hook";
import React from "react";
import {
  Radar,
  RadarChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
} from "recharts";

// Sample data for the radar chart
const data = [
  {
    subject: "Math",
    A: 69,
    B: 110,
    fullMark: 100,
  },
  {
    subject: "Chinese",
    A: 54,
    B: 130,
    fullMark: 100,
  },
  {
    subject: "English",
    A: 86,
    B: 100,
    fullMark: 100,
  },
  {
    subject: "Geography",
    A: 85,
    B: 100,
    fullMark: 100,
  },
  {
    subject: "Physics",
    A: 85,
    B: 90,
    fullMark: 100,
  },
];
const filteredAttendance = attendance.map((item) => {
  return {
    subject: item.code,
    percentage: Number(Number(item.percetage).toFixed()),
  };
});
console.log(filteredAttendance);

export default function App() {
  const isMobile = useWindow();
  const [width, setWidth] = React.useState(500);
  const [height, setHeight] = React.useState(500);
  React.useEffect(() => {
    if (isMobile && isMobile !== undefined) {
      setWidth(500);
      setHeight(400);
    }
  }, [isMobile]);

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
