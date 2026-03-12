import Header from "../components/header";

export default function AboutPage() {
  return (
    <div className="w-dvw min-h-dvh flex flex-col overflow-hidden">
      <Header value="about" />
      <main className="flex-1 container mx-auto px-4 py-10 max-w-5xl">
        <section className="space-y-6">
          <h1 className="text-3xl lg:text-4xl font-semibold tracking-tight">
            About
          </h1>
          <p className="text-sm lg:text-base opacity-80">
            AcademiaX is a modern, independent companion interface designed for
            SRM students who use the official SRM Academia portal. Our platform
            puts clarity, speed, and a distraction-free experience at the
            forefront, making it effortless for you to view your existing
            academic data more efficiently.
          </p>
          <div className="space-y-3">
            <p className="text-sm lg:text-base opacity-80">
              <strong>Key Features:</strong>
            </p>
            <ul className="list-disc list-inside pl-4 text-sm lg:text-base opacity-80 space-y-1">
              <li>
                Instantly view your attendance, marks, current timetable, and
                more.
              </li>
              <li>
                Clean, minimal interface focused solely on useful information.
              </li>
              <li>
                Optimized for speed and everyday usability on all devices.
              </li>
              <li>Zero distractions.</li>
            </ul>
          </div>
          <div className="space-y-2">
            <p className="text-sm lg:text-base opacity-80">
              <strong>Why AcademiaX?</strong>
            </p>
            <ul className="list-disc list-inside pl-4 text-sm lg:text-base opacity-80 space-y-1">
              <li>
                SRM Academia portal can often feel crowded and slow, making it
                difficult to quickly find what you need.
              </li>
              <li>
                AcademiaX offers a streamlined alternative built with students
                in mind.
              </li>
              <li>
                View the information you already have - just presented better.
              </li>
            </ul>
          </div>
          <p className="text-sm lg:text-base opacity-80">
            <strong>
              What AcademiaX is <u>not</u>:
            </strong>
          </p>
          <ul className="list-disc list-inside pl-4 text-sm lg:text-base opacity-80 space-y-1 mb-6">
            <li>Not a replacement for the official SRM Academia portal.</li>
            <li>
              Does not let you alter, submit, or interact with SRM systems -
              read-only and safe.
            </li>
            <li>
              Does not store or sell your data (see our{" "}
              <a href="/privacy" className="underline hover:text-blue-400">
                Privacy Policy
              </a>{" "}
              for details).
            </li>
          </ul>
          <p className="text-xs lg:text-sm opacity-70 border-2 border-dotted border-white/10 rounded-lg bg-white/5 px-4 py-3">
            <strong>Disclaimer:</strong> AcademiaX is an independent / fun
            project built by{" "}
            <a href="https://jackwaghan.com" className="underline">
              me
            </a>{" "}
            and is not affiliated with official SRM Academia portal.
          </p>
        </section>
      </main>
    </div>
  );
}
