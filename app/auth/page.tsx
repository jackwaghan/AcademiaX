import { redirect } from "next/navigation";

const page = () => {
  return redirect("/auth/login");
};

export default page;
