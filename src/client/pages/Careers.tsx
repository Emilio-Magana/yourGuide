export default function Careers({ lastUpdated }: { lastUpdated: string }) {
  return (
    <section className="mx-6 my-28 space-y-6 text-primary duration-300 s_window:mx-10 m_window:mx-14 l_window:mx-16 xl_window:mx-20">
      <div className="space-y-4">
        <h1 className="text-5xl">careers.</h1>
        <p>Last Updated: {lastUpdated}</p>
      </div>
      <div className="mt-6 space-y-4">
        <h2 className="font-serif text-3xl tracking-wide">
          To no one&apos;s surprise...
        </h2>
        <p className="text-tertiary">
          I was actually hoping whoever to be reading this to be the one
          intereseted in providing me income for some type of work.
        </p>
        <p className="text-tertiary">
          I hope that&apos;s not too surprising...
        </p>
      </div>
    </section>
  );
}
