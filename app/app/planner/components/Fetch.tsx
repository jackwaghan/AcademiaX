import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import PlannerLayout from "./PlannerLayout";

async function fetchdata() {
  const cookie = (await cookies()).get("token")?.value;
  if (!cookie) return redirect("/auth/login");

  const data = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/planner`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      cookie: `token=${cookie}`,
    },
    credentials: "include",
  });

  return { data: await data.json() };
}

export default async function Fetch({
  children,
}: {
  children: React.ReactNode;
}) {
  const result = await fetchdata();

  const { data } = result;

  return <PlannerLayout data={data}>{children}</PlannerLayout>;
}
