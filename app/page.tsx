import Link from "next/link";

export default function Home() {
  return (
    <div
      className="w-screen h-screen flex items-center justify-center overflow-hidden
    "
    >
      <Link href="/app">Open App</Link>
    </div>
  );
}
