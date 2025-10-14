import type { RefObject } from "react";
import { Link } from "react-router-dom";

export type Section = {
  id: string;
};

interface SecNavProps {
  sections: Array<Section>;
  sectionRefs: Record<string, RefObject<HTMLDivElement | null>>;
}
export default function SectionNavigator({
  sections,
  sectionRefs,
}: SecNavProps) {
  const scrollToSection = (id: string) => {
    sectionRefs[id].current?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <nav className="sticky top-0 z-20 flex place-content-between bg-white px-2 py-[13px] text-sm m_window:text-base l_window:px-6">
      <ul className="flex gap-0 text-blue-500 transition-all duration-300 ease-in-out m_window:gap-2 l_window:gap-4 xl_window:gap-5">
        {sections.map((section, id) => (
          <li key={id}>
            <button
              className="place-self-center rounded-3xl px-3 py-3 transition-all ease-in-out hover:bg-blue-200 s_window:px-5"
              onClick={() => scrollToSection(section.id)}
            >
              {section.id}
            </button>
          </li>
        ))}
      </ul>
      <Link
        to="/checkout/:tourId"
        className="rounded-3xl bg-blue-500 px-3 py-3 transition-all ease-in-out s_window:px-5"
      >
        Start Planning
      </Link>
    </nav>
  );
}
