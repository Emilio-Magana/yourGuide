export default function AboutUs({ lastUpdated }: { lastUpdated: string }) {
  return (
    <section className="mx-6 my-28 space-y-5 text-primary duration-300 s_window:mx-10 m_window:mx-14 l_window:mx-16 xl_window:mx-20">
      <div className="space-y-4">
        <h1 className="text-5xl">about us.</h1>
        <p>Last Updated: {lastUpdated}</p>
      </div>
      <div className="mt-6 space-y-3">
        <h2 className="font-serif text-3xl tracking-wide">Hello</h2>
        <p className="text-tertiary">
          Not much to say here, it&apos;s just me at the moment :3
        </p>
      </div>
      <p>Last Updated: {lastUpdated}</p>
    </section>
  );
}
