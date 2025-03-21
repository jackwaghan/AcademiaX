"use client";
import {
  Eye,
  EyeClosed,
  LockKeyhole,
  LockKeyholeOpen,
  UserRound,
  UserRoundSearch,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const Page = () => {
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [error, setError] = React.useState("");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;
    try {
      const loginResponse = await fetch(
        `${process.env.NEXT_PUBLIC_DOMAIN}/api/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      ).then((res) => res.json());

      if (loginResponse.error) {
        setError(loginResponse.error);
        return;
      }
      setMessage(loginResponse.message);
      const sessionCreate = await fetch(
        `${process.env.NEXT_PUBLIC_DOMAIN}/api/setsession`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: loginResponse.token }),
        }
      ).then((res) => res.json());
      if (sessionCreate.error) {
        setError(sessionCreate.error);
        return;
      }
      setMessage(sessionCreate.message);
      router.push(`${process.env.NEXT_PUBLIC_DOMAIN}/app/timetable`);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <form
      className="flex flex-col h-full w-full items-center justify-center  font-geist-mono gap-1 "
      onSubmit={handleSubmit}
    >
      <div className="flex items-center justify-center gap-4 ">
        {email.length !== 0 ? (
          <UserRoundSearch size={30} className="stroke-orange-500" />
        ) : (
          <UserRound size={30} className="stroke-blue-500" />
        )}
        <input
          type="text"
          name="email"
          id="email"
          onChange={(e) => setEmail(e.currentTarget.value)}
          className={`px-5 text-xl py-4 md:py-5 border border-foreground/10 focus:outline-none focus:ring-2  bg-foreground/5 shadow-2xl rounded-tr-3xl rounded-tl-3xl ${email.length !== 0 ? "focus:ring-orange-500" : "focus:ring-blue-500"}`}
          placeholder="Email"
        />
      </div>
      <div className="relative flex items-center justify-center gap-4 ">
        {password.length !== 0 ? (
          <LockKeyhole size={30} className="stroke-orange-500" />
        ) : (
          <LockKeyholeOpen size={30} className="stroke-blue-500" />
        )}

        <input
          type={`${showPassword ? "text" : "password"}`}
          name="password"
          id="password"
          onChange={(e) => setPassword(e.currentTarget.value)}
          className={`relative px-5 text-xl py-4 md:py-5 border border-foreground/10 focus:outline-none focus:ring-2  bg-foreground/5 shadow-2xl rounded-br-3xl rounded-bl-3xl ${password.length !== 0 ? "focus:ring-orange-500" : "focus:ring-blue-500"}`}
          placeholder="Password"
        />
        <div className="absolute right-5">
          {showPassword ? (
            <Eye
              size={30}
              className=" stroke-orange-500 cursor-pointer z-50 hover:scale-90 duration-300"
              onClick={() => setShowPassword(!showPassword)}
            />
          ) : (
            <EyeClosed
              size={30}
              className=" stroke-orange-500 cursor-pointer z-50 hover:scale-90 duration-300"
              onClick={() => setShowPassword(!showPassword)}
            />
          )}
        </div>
      </div>
      <button
        type="submit"
        className="mt-7  border border-foreground/10  text-foreground px-5 py-2 cursor-pointer bg-foreground/5 hover:bg-foreground/10 rounded shadow-2xl hover:scale-95 duration-300"
      >
        {error && !message && <p className="text-red-500">{error}</p>}
        {message && <p className="text-green-500">{message}</p>}
        {!error && !message && <p className="text-orange-500">Login</p>}
      </button>
    </form>
  );
};

export default Page;
