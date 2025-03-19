"use client";
import { redirect } from "next/navigation";
import React from "react";

const Page = () => {
  React.useEffect(() => {
    const fetchData = async () => {
      await fetch("/api/setcookie", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            console.error(data.error);
            return;
          }
          redirect("/app/profile");
        });
    };
    fetchData();
  }, []);

  return <div>Login</div>;
};

export default Page;
