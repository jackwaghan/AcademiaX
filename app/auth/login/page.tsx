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
    <div className="flex w-screen h-screen items-center justify-center bg-foreground/10">
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="bg-foreground/5 border border-foreground/15 rounded-lg text-xl flex flex-col gap-4 p-5 "
      >
        <div className=" flex gap-4 justify-center flex-col">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="bg-foreground/10 border border-foreground/10 rounded px-2 py-0.5 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className=" flex gap-4 justify-center flex-col">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className="bg-foreground/10 border border-foreground/10 rounded px-2 py-0.5 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex items-center mt-5">
          <button
            type="submit"
            className="w-full bg-foreground text-background px-3 text-md py-1 rounded cursor-pointer hover:bg-blue-500 hover:text-white"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Page;
