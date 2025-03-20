"use client";
import { redirect } from "next/navigation";
import React from "react";

const Page = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;
    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        }
        redirect("/app");
      });
  };
  return (
    <div className="flex w-screen h-screen items-center justify-center">
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="flex flex-col gap-4 p-5 border border-foreground/15 rounded-lg text-xl">
          <div className=" flex gap-4 justify-center flex-col">
            <label htmlFor="username">Email</label>
            <input
              type="text"
              id="email"
              className="border border-foreground/10 rounded px-2 py-1 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className=" flex gap-4 justify-center flex-col">
            <label htmlFor="password">Password</label>
            <input
              type="text"
              id="password"
              className="border border-foreground/10 rounded px-2 py-1 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex items-center">
            <button
              type="submit"
              className="bg-foreground text-background px-3 text-md py-1 rounded-lg cursor-pointer hover:bg-blue-500 hover:text-white"
            >
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Page;
