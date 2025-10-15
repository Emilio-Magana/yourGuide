import type { RefObject } from "react";
import StaggeredTestimonials from "../components/StaggeredTestimonials";

interface TourReviewProps {
  sectionRef: RefObject<HTMLDivElement | null>;
  className: string;
}

export default function TourReviews({
  sectionRef,
  className,
}: TourReviewProps) {
  return (
    <section ref={sectionRef} className={className}>
      <h1 className="bg-centerLBg place-self-center rounded-t-3xl px-6 pt-2 font-serif text-4xl text-white">
        Reviews
      </h1>
      <StaggeredTestimonials
        className="border-centerLBg bg-centerLBg relative flex h-[350px] justify-center overflow-hidden rounded-3xl border-[11px]"
        length={6}
      />
    </section>
  );
}
