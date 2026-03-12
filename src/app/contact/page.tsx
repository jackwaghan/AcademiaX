import Header from "../components/header";
import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="w-dvw min-h-dvh flex flex-col overflow-hidden">
      <Header value="contact" />
      <main className="flex-1 container mx-auto px-4 py-10 max-w-5xl space-y-6">
        <section className="space-y-3">
          <h1 className="text-3xl lg:text-4xl font-semibold tracking-tight">
            Contact
          </h1>
          <p className="text-sm lg:text-base opacity-80">
            Have feedback, found a bug, or want to suggest a feature? You can
            reach out directly to the developer of AcademiaX using the options
            below.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold">Email</h2>
          <p className="text-sm lg:text-base opacity-80">
            For support or general questions, send an email to:
          </p>
          <p className="text-sm lg:text-base opacity-90 apply-border-md rounded-lg bg-white/5 px-2 py-1 inline-block">
            <a href="mailto:hello@jackwaghan.com">admin@academiax.in</a>
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold">GitHub</h2>
          <p className="text-sm lg:text-base opacity-80">
            You can also open an issue or follow development on GitHub:
          </p>
          <Link
            href="https://github.com/jackwaghan/academiax"
            target="_blank"
            className="inline-flex px-2 py-1 rounded-lg bg-white/5 apply-border-md text-sm lg:text-base"
          >
            github.com/jackwaghan/academiax
          </Link>
        </section>
      </main>
    </div>
  );
}
