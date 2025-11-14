import { createRef } from "react";
import type { Section } from "../ui/SectionNavigator";

export const refGenerator = (sections: Section[]) => {
  const refs: Record<string, React.RefObject<HTMLDivElement | null>> = {};
  sections.forEach((section) => {
    refs[section.id] = createRef<HTMLDivElement | null>();
  });
  return refs;
};
