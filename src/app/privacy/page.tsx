import Header from "../components/header";

export default function PrivacyPage() {
  return (
    <div className="w-dvw min-h-dvh flex flex-col overflow-hidden">
      <Header value="privacy" />
      <main className="flex-1 container mx-auto px-4 py-10 max-w-5xl space-y-6">
        <section className="space-y-3">
          <h1 className="text-3xl lg:text-4xl font-semibold tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-sm lg:text-base opacity-80">
            This Privacy Policy explains how AcademiaX handles your information
            when you use the application. AcademiaX is designed to act as a
            read-only companion for viewing your existing SRM Academia data in a
            cleaner interface.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold">Information we access</h2>
          <p className="text-sm lg:text-base opacity-80">
            When you sign in, AcademiaX uses your SRM credentials to retrieve
            academic information such as attendance, timetable and marks from
            the official SRM Academia systems.
          </p>
          <p className="text-sm lg:text-base opacity-80">
            This information is used solely to display your data inside the
            AcademiaX interface for your personal use.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold">Data storage</h2>
          <p className="text-sm lg:text-base opacity-80">
            AcademiaX does not sell your data or share it with advertisers. Any
            temporary data stored in your browser or on the server is used only
            to keep you signed in and to improve your experience while using the
            app.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold">Third-party services</h2>
          <p className="text-sm lg:text-base opacity-80">
            AcademiaX may use third-party services such as analytics tools or
            advertising platforms (including Google AdSense) to understand usage
            patterns and support development. These services may set their own
            cookies or collect usage data in line with their respective privacy
            policies.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold">Changes to this policy</h2>
          <p className="text-sm lg:text-base opacity-80">
            This Privacy Policy may be updated from time to time. Significant
            changes will be reflected on this page with an updated effective
            date.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold">Contact</h2>
          <p className="text-sm lg:text-base opacity-80">
            If you have questions about how your data is handled, you can reach
            out to the developer using the contact options on the Contact page.
          </p>
        </section>
      </main>
    </div>
  );
}
