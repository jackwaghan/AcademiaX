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

  if (data.ok) {
    return await data.json();
  }
}

export default async function Main({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await fetchdata();
  if (!data) {
    return (
      <div className="w-screen h-screen flex justify-center items-center  overflow-hidden">
        <div className="flex flex-col items-center gap-4 ">
          <p className="text-lg">Unable to get your details </p>
          <Button />
        </div>
      </div>
    );
  }

  return <AppLayout data={data}>{children}</AppLayout>;
}
