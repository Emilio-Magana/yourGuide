import { FaLinkedin } from "react-icons/fa";
export default function Contact({ lastUpdated }: { lastUpdated: string }) {
  return (
    <section className="mx-6 my-28 space-y-5 text-primary duration-300 s_window:mx-10 m_window:mx-14 l_window:mx-16 xl_window:mx-20">
      <div className="space-y-4">
        <h1 className="text-5xl">contact.</h1>
        <p>Last Updated: {lastUpdated}</p>
      </div>
      <div className="space-y-4">
        <h2 className="font-serif text-3xl tracking-wide">
          Here are some ways of getting in contact with me!
        </h2>
        <div>
          <h3>One way would be through my Email:</h3>
          <ul className="list-none">
            <li className="before:mr-2 before:text-blue-500 before:content-['\2192\00a0']">
              <a href="mailto:magana.emil.a@gmail.com">
                magana.emil.a@gmail.com
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3>or through my LinkedIn!</h3>
          <ul className="list-none">
            <li className="flex items-center before:mr-2 before:text-blue-500 before:content-['\2192\00a0']">
              <a
                className="inline-flex"
                href="https://www.linkedin.com/in/me-emilio-maga%C3%B1a/"
              >
                <span className="text-xl font-semibold">Linked</span>
                <FaLinkedin size={26} />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
