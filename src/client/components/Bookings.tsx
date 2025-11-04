import { type RefObject } from "react";
import TourHeader from "../ui/TourHeader";

interface BookingsProps {
  sectionRef: RefObject<HTMLDivElement | null>;
  id: string;
  userName?: string;
  userEmail?: string;
  className: string;
}

export default function Bookings({ sectionRef, id, className }: BookingsProps) {
  return (
    <article id={id} ref={sectionRef} className={className}>
      Bookings
      <TourHeader tourCover="tour-1-3.jpg" title="" detailed={false} />
    </article>
  );
}
