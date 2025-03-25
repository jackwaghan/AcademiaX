import React from "react";
import Button from "./Button";
import AppLayout from "./AppLayout";
import { cookies } from "next/headers";

async function fetchdata() {
  const token = (await cookies()).get("token")?.value;

  const data = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/getdata`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      cookie: `token=${token}`,
    },
    credentials: "include",
  });
  return { data: await data.json(), status: data.status };
}

export default async function Main({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data, status } = await fetchdata();
  if (status === 401) return;

  <div className="w-screen h-screen flex justify-center items-center  overflow-hidden">
    <div className="flex flex-col items-center gap-4 ">
      <p className="text-lg">Try to Reload Page</p>
      <Button status="401" />
    </div>
  </div>;
  if (status === 500) {
    return (
      <div className="w-screen h-screen flex justify-center items-center  overflow-hidden">
        <div className="flex flex-col items-center gap-4 ">
          <p className="text-lg">Internal Server Error</p>
          <Button status="500" />
        </div>
      </div>
    );
  }

  if (status === 403 || status === 402) {
    return (
      <div className="w-screen h-screen flex justify-center items-center  overflow-hidden">
        <div className="flex flex-col items-center gap-4 ">
          <p className="text-lg">You have been logged out</p>
          <Button status="403" />
        </div>
      </div>
    );
  }

  return <AppLayout data={data}>{children}</AppLayout>;
}
