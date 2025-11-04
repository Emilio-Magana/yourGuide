import type { IconType } from "react-icons";
import { Link } from "react-router-dom";
import type { RefObject } from "react";

export type Section = {
  id: string;
  icon?: IconType;
};

interface SecNavProps {
  sections: Array<Section>;
  sectionRefs: Record<string, RefObject<HTMLDivElement | null>>;
  className: string;
}
export default function SectionNavigator({
  sections,
  sectionRefs,
  className,
}: SecNavProps) {
  const scrollToSection = (id: string) => {
    sectionRefs[id].current?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <nav className={className}>
      <ul className="text-highLightBg flex gap-0 duration-300 m_window:gap-2 l_window:gap-4 xl_window:gap-5">
        {sections.map((section, id) => (
          <li key={id}>
            <button
              className="place-self-center rounded-3xl px-3 py-3 duration-300 hover:bg-blue-200 s_window:px-3 m_window:px-5"
              onClick={() => scrollToSection(section.id)}
            >
              {section.id}
            </button>
          </li>
        ))}
      </ul>
      <Link
        to="/checkout/:tourId"
        className="bg-highLightBg rounded-3xl px-3 py-3 text-white duration-300 hover:-translate-y-1 hover:drop-shadow-[0_2px_1.2px_var(--primary)] s_window:px-3 m_window:px-5"
      >
        Start Planning
      </Link>
    </nav>
  );
}
