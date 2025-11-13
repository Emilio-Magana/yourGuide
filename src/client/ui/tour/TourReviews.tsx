import StaggeredTestimonials from "../../components/StaggeredTestimonials";
import type { Review } from "../../config/schema";

import type { RefObject } from "react";

interface TourReviewProps {
  sectionRef: RefObject<HTMLDivElement | null>;
  className: string;
  reviews: Review[];
}

export default function TourReviews({
  sectionRef,
  className,
  reviews,
}: TourReviewProps) {
  return (
    <section ref={sectionRef} className={className}>
      <h1 className="place-self-center rounded-t-3xl bg-centerLBg px-6 pt-2 font-serif text-4xl text-white">
        Reviews
      </h1>
      <StaggeredTestimonials
        className="relative flex h-[350px] justify-center overflow-hidden rounded-3xl border-[11px] border-centerLBg bg-centerLBg"
        reviews={reviews}
      />
    </section>
  );
}
