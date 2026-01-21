"use client";
import { useAuth } from "@/hooks/zustand";
import { validatePassword, validateUser } from "@/server/action";
import { Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Loader } from "../app/components/loader";

export const LoginComponent = () => {
  const [eyeOpen, setEyeOpen] = useState(false);
  const { error, setError, loading, setLoading, setEmail, email } = useAuth();

  useEffect(() => {
    window.localStorage.clear();
  }, []);

  const HandleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const form = new FormData(e.currentTarget);
      const hash1 = form.get("name") as string;
      const hash2 = form.get("password") as string;

      // First step: Validate user (email)
      if (hash1 && hash1.length !== 0) {
        const email = hash1.includes("@srmist.edu.in")
          ? hash1
          : `${hash1}@srmist.edu.in`;
        const { res } = await validateUser(email.toLowerCase());

        if (res.data?.status_code === 400) {
          setError(res.data?.message as string);
          setLoading(false);
          return;
        }
        if (res.data?.status_code === 500) {
          setError("You reached Maximum Login");
          setLoading(false);
          return;
        }
        if (res.error) {
          setError(res.errorReason as string);
          setLoading(false);
          return;
        }

        if (res.data?.digest && res.data?.identifier) {
          setEmail({
            mail: email.toLowerCase(),
            digest: res.data.digest as string,
            identifier: res.data.identifier as string,
          });
          setLoading(false);
          return;
        } else {
          setError("Invalid response from server");
          setLoading(false);
          return;
        }
      }

      // Second step: Validate password
      if (hash2 && hash2.length !== 0) {
        if (!email.digest || !email.identifier) {
          setError("Please enter your email first");
          setLoading(false);
          return;
        }

        const { res } = await validatePassword({
          digest: email.digest,
          identifier: email.identifier,
          password: hash2,
        });

        if (res.data?.statusCode === 500 || res.data?.captcha?.required) {
          if (res.data?.captcha?.required) {
            setError(res.data.message as string);
            setLoading(false);
            return;
          }
          setError(res.data?.message as string);
          setLoading(false);
          return;
        }

        if (res.error) {
          setError(res.errorReason as string);
          setLoading(false);
          return;
        }

        if (res.isAuthenticated && typeof res.data?.cookies === "string") {
          Cookies.set("token", res.data.cookies, { path: "/" });
          Cookies.set("user", email.mail, { path: "/" });
          return (window.location.href = "/app/timetable");
        } else {
          setError("Authentication failed");
          setLoading(false);
          return;
        }
      }

      // If neither hash1 nor hash2 is provided
      setError("Please enter your credentials");
      setLoading(false);
    } catch (error) {
      console.error("Login error:", error);
      setError("An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  };
  return (
    <div className="flex-1 flex items-center justify-center px-6 lg:px-0">
      <div className="relative max-w-5xl min-h-[50%] w-full rounded-2xl grid grid-cols-1 lg:grid-cols-2 bg-white/5 apply-border-md backdrop-blur-3xl apply-inner-shadow-sm">
        <div className="absolute inset-0 bg-blue-400/40 blur-3xl -z-10 " />

        <div className="flex items-center justify-center min-h-20 lg:text-4xl h-full text-2xl ">
          Login
        </div>
        <h1 className="absolute -top-20 left-1/2 -translate-x-1/2  text-sm lg:text-lg w-full flex items-center justify-center text-white/50">
          Note: This is an unofficial student-built wrapper for SRM Academia.
          Please use it responsibly.
        </h1>
        <div className="w-full h-full flex items-center justify-center ">
          <form
            onSubmit={HandleSubmit}
            className="w-[90%] h-[90%] flex flex-col justify-center items-center gap-10 p-4"
          >
            <div className="w-full flex flex-col gap-4 ">
              {/* Show email input if digest is empty (first step) */}
              {email?.digest.length === 0 && (
                <input
                  id="name"
                  name="name"
                  type="name"
                  className="w-full px-4 py-3 rounded-xl apply-inner-shadow-sm bg-white/10 focus:outline-none "
                  placeholder="SRM Mail ID"
                  autoComplete="email"
                  autoFocus
                  required
                />
              )}
              {/* Show password input if digest is present and password is not yet set (second step) */}
              {email?.digest.length !== 0 && (
                <div className="w-full relative z-10 ">
                  <input
                    id="password"
                    name="password"
                    type={eyeOpen ? "name" : "password"}
                    className="w-full px-4 py-3 rounded-xl apply-inner-shadow-sm bg-white/10 focus:outline-none "
                    placeholder="Password"
                    autoComplete="current-password"
                    autoFocus
                    required
                  />
                  <div className="right-0 top-1/2 -translate-y-1/2 absolute flex items-center justify-end pr-5 ">
                    {eyeOpen ? (
                      <Eye
                        onClick={() => setEyeOpen((prev) => !prev)}
                        className="h-6 w-6 "
                      />
                    ) : (
                      <EyeOff
                        onClick={() => setEyeOpen((prev) => !prev)}
                        className="h-6 w-6"
                      />
                    )}
                  </div>
                </div>
              )}
            </div>
            {error &&
              (typeof error === "string" ? (
                String(error).includes("CAPTCHA") ? (
                  <div className="text-red-400">Captcha not supported yet</div>
                ) : error.length !== 0 ? (
                  <div className="text-red-400">{String(error)}</div>
                ) : null
              ) : (
                <div className="text-red-400">
                  {String(error).includes("Error") ? (
                    <a className="flex items-center justify-center gap-2 flex-col">
                      Password Expired
                      <a
                        href="https://academia.srmist.edu.in"
                        target="_blank"
                        rel="noopener"
                        className="text-white/50 text-sm underline "
                      >
                        (Open Academia to set new password)
                      </a>
                    </a>
                  ) : (
                    String(error)
                  )}
                </div>
              ))}
            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-3 rounded-xl apply-inner-shadow-md bg-black  focus:outline-none  flex item-center justify-center cursor-pointer"
            >
              {loading ? <Loader className="w-5 h-5 " /> : "Authenticate"}
            </button>
          </form>
        </div>
        <a
          href="https://academia.srmist.edu.in/reset"
          target="_blank"
          rel="noopener"
          className="absolute -bottom-20 left-1/2 -translate-x-1/2  px-3 py-1 apply-border-sm bg-white/5 rounded text-sm"
        >
          Forget Password ?
        </a>
      </div>
    </div>
  );
};
