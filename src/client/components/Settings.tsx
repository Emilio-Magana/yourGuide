import type { RefObject } from "react";
import TourHeader from "../ui/TourHeader";

interface SettingsProps {
  sectionRef: RefObject<HTMLDivElement | null>;
  userEmail?: string;
  className: string;
  userName?: string;
  id: string;
}

export default function Settings({ sectionRef, id, className }: SettingsProps) {
  return (
    <article id={id} ref={sectionRef} className={className}>
      Settings
      <TourHeader tourCover="tour-1-3.jpg" title="" detailed={false} />
    </article>
  );
}
