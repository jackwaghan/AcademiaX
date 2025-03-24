"use client";
import { Eye, EyeOffIcon, GraduationCap, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const Page = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [success, setSuccess] = React.useState<string>("");
  const [error, setError] = React.useState<string>("");
  const [submitting, setSubmitting] = React.useState(false);
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setSubmitting(true);
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
          credentials: "include",
          body: JSON.stringify({ email, password }),
        }
      ).then((res) => res.json());

      if (loginResponse.error) {
        setSubmitting(false);
        setError(loginResponse.error);
        return;
      }
      setError("");
      setSuccess(loginResponse.message);
      setSubmitting(false);
      router.push("/app");
    } catch (error) {
      setSubmitting(false);
      setError("An error occurred. Please try again later.");
      console.error(error);
    }
  };
  return (
    <div className="w-dvw h-dvh flex flex-col font-poppins px-4">
      <nav className="relative max-w-7xl mx-auto mt-5 border border-foreground/10 bg-foreground/5 backdrop-blur-3xl rounded-xl  h-[60px] flex items-center justify-between px-4 w-full">
        <div className="flex items-center justify-center gap-4 text-xl ">
          <GraduationCap size={30} className="stroke-orange-500" />
          <h1>AcademiaX SRM</h1>
        </div>
        <Link
          href={"/"}
          className="bg-orange-500 text-black px-3 py-1 md:px-4 md:py-2 rounded-lg hover:scale-90 duration-300 cursor-pointer font-semibold"
        >
          Back
        </Link>
        <div className="absolute inset-0 bg-orange-500/20 blur-3xl -z-10" />
      </nav>
      <main className="pt-15 w-full max-w-7xl mx-auto flex-1 items-center flex flex-col">
        <h1 className="text-2xl md:text-4xl text-center leading-tight">
          Welcome Back!
        </h1>
        <p className="px-2 text-md md:text-xl mt-10 text-foreground/80  flex items-center max-w-3xl text-center">
          Login to your account using SRM email and password
        </p>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className=" flex flex-col gap-4 mt-10 md:mt-20 w-[300px] md:w-[350px] p-8 md:p-10 bg-foreground/5 border border-foreground/10 rounded-lg"
        >
          <label htmlFor="email">
            <p className="text-sm md:text-lg">Email</p>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@srmist.edu.in"
              className={`mt-2 outline-none focus:ring-1 focus:ring-orange-500 bg-foreground/5 border border-foreground/5 rounded-lg px-2 py-1.5 w-full ${error ? "ring-1 ring-red-500" : success ? "ring-1 ring-green-500" : ""}`}
            />
          </label>
          <label htmlFor="password">
            <p className="text-sm md:text-lg">Password</p>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                id="password"
                autoSave="off"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                className={`relative mt-2 outline-none focus:ring-1 focus:ring-orange-500 bg-foreground/5 border border-foreground/5 rounded-lg px-2 py-1.5 w-full pr-10 ${error && !success ? "ring-1 ring-red-500" : !error && success ? "ring-1 ring-green-500" : ""}`}
              />
              {!showPassword ? (
                <EyeOffIcon
                  size={20}
                  className="cursor-pointer hover:scale-90 duration-200 absolute right-2 bottom-2 stroke-orange-500"
                  onClick={() => setShowPassword(true)}
                />
              ) : (
                <Eye
                  size={20}
                  className="cursor-pointer hover:scale-90 duration-200 absolute right-2 bottom-2 stroke-orange-500"
                  onClick={() => setShowPassword(false)}
                />
              )}
            </div>
          </label>
          {error && !success && (
            <p className="text-red-500 text-center ">
              {error === "You have reached session limit" ? (
                <a
                  href="https://academia.srmist.edu.in/49910842/portal/academia-academic-services/myProfile"
                  className="underline cursor-pointer "
                >
                  {error}
                </a>
              ) : (
                error
              )}
            </p>
          )}
          {success && <p className="text-green-500 text-center ">{success}</p>}

          <button
            type="submit"
            className="mt-5 bg-orange-500 text-black px-3 py-2 md:px-4 md:py-2 rounded-lg hover:scale-95 duration-300 cursor-pointer font-semibold items-center flex justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={submitting || email === "" || password === ""}
          >
            {submitting ? (
              <Loader2 size={20} className="animate-spin " />
            ) : (
              "Login"
            )}
          </button>
        </form>
      </main>
    </div>
  );
};

export default Page;
