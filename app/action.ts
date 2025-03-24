"use server";
export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  }).then((res) => res.json());
  return response;
}
