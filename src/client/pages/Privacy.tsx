export default function Privacy({ lastUpdated }: { lastUpdated: string }) {
  return (
    <section className="mx-6 mt-[70px] text-primary duration-300 s_window:mx-10 m_window:mx-14 l_window:mx-16 xl_window:mx-20">
      <div className="space-y-4">
        <h1 className="text-5xl">privacy policy.</h1>
        <p>Last Updated: {lastUpdated}</p>
      </div>
      <div className="mt-6 space-y-4">
        <h2 className="font-serif text-3xl tracking-wide">Hey, Welcome!</h2>
        <p className="text-tertiary">
          Thanks for stopping by! This <b>Privacy Policy</b> is just here to let
          the viewer know how information is collected. To start off yourGuide
          is mainly about showcasing my work for my cv, and some personal info.
          In no shape nor form will ones own data be sold, traded, nor shared on
          here. If you shared something sensitive by accident, feel free to
          reach out, and I&apos;ll help you remove it.
        </p>
        <h2 className="font-serif text-3xl tracking-wide">
          What Information I Collect (Hint: Not Much)
        </h2>
        <p className="text-tertiary">
          Honestly, this is just a static portfolio site, so I don&apos;t
          actively collect any personal information. There&apos;s no account
          creation, no tracking cookies, and definitely no sneaky data
          gathering.
        </p>
        <p className="text-tertiary">
          The only information is that which has been submitted as part of your
          profile page: email, and any other information used in the curation of
          your profile, therefore please <b className="text-rose-500">avoid</b>{" "}
          sharing any confidential info in your profile page.
        </p>
        <h2 className="font-serif text-3xl tracking-wide">
          How I Use the Info
        </h2>
        <p className="text-tertiary">
          Here&apos;s what I might do with any information I collect:
        </p>
        <ul className="text-tertiary">
          <li className="before:mr-2 before:text-blue-500 before:content-['\2192\00a0']">
            Literally Nothing. Your Information will strictly be there in place
            as UI.
          </li>
        </ul>
        <h2 className="font-serif text-3xl tracking-wide">
          Security (The Internet Isn&apos;t Perfect)
        </h2>
        <p className="text-tertiary">
          I&apos;ll do my best to keep any info you share safe, but let&apos;s
          be real—no system is foolproof. While I&apos;ll take reasonable steps
          to protect your info, I can&apos;t promise 100% security.
        </p>

        <h2 className="font-serif text-3xl tracking-wide">Got Questions?</h2>
        <p className="text-tertiary">
          If you have any questions, concerns, or just want to say hi, drop me
          an email at{" "}
          <a className="" href="mailto:magana.emil.a@gmail.com">
            magana.emil.a@gmail.com.{" "}
          </a>
          I&apos;d love to hear from you!
        </p>
      </div>
    </section>
  );
}
