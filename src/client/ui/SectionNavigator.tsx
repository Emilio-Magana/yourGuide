import type { IconType } from "react-icons";
import { Link } from "react-router-dom";
import type { RefObject } from "react";
import type { User } from "../config/schema";

export type Section = {
  id: string;
  Icon?: IconType;
};

export interface UserSection extends Section {
  sectionRef: RefObject<HTMLDivElement | null>;
  user?: User;
}

interface Props {
  sectionRefs: Record<string, RefObject<HTMLDivElement | null>>;
  sections: Section[];
  className: string;
  tourId: string;
}
export default function SectionNavigator({
  sections,
  sectionRefs,
  className,
  tourId,
}: Props) {
  const scrollToSection = (id: string) => {
    sectionRefs[id].current?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <nav className={className}>
      <ul className="flex gap-0 text-sky-500 duration-300 m_window:gap-2 l_window:gap-4 xl_window:gap-5">
        {sections.map((section, id) => (
          <li key={id}>
            <button
              className="place-self-center rounded-3xl px-3 py-3 duration-300 hover:bg-sky-200 s_window:px-3 m_window:px-5"
              onClick={() => scrollToSection(section.id)}
            >
              {section.id}
            </button>
          </li>
        ))}
      </ul>
      <Link
        to={`/tours/${tourId}/checkout`}
        className="rounded-3xl bg-sky-500 px-3 py-3 text-header duration-300 hover:-translate-y-1 hover:drop-shadow-[0_4px_1.2px_var(--primary)] s_window:px-3 m_window:px-5"
      >
        Start Planning
      </Link>
    </nav>
  );
}
