import { type RefObject } from "react";
import TourHeader from "../ui/TourHeader";

interface ReviewsProps {
  sectionRef: RefObject<HTMLDivElement | null>;
  id: string;
  userName?: string;
  userEmail?: string;
  className: string;
}

export default function Reviews({ sectionRef, id, className }: ReviewsProps) {
  return (
    <article id={id} ref={sectionRef} className={className}>
      Reviews
      <TourHeader tourCover="tour-1-2.jpg" title="" detailed={false} />
    </article>
  );
}
