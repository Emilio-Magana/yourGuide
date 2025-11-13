import type { RefObject } from "react";
// import type { User } from "../config/schema";

interface AllReviewsProps {
  sectionRef: RefObject<HTMLDivElement | null>;
  className: string;
  id: string;
  //   users: User[];
}

export default function AllReviews({
  sectionRef,
  className,
  id,
}: AllReviewsProps) {
  return (
    <article id={id} ref={sectionRef} className={className}>
      <h1 className="font-semibold duration-300">All Reviews</h1>
    </article>
  );
}
