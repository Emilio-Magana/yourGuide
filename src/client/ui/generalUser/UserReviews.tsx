import { useGetUserReviews } from "../../api/queries";
import UserReviewCard from "../UserReviewCard";
import type { User } from "../../config/schema";

import { type RefObject } from "react";

interface ReviewsProps {
  sectionRef: RefObject<HTMLDivElement | null>;
  className: string;
  id: string;
  user: User;
}

export default function UserReviews({
  sectionRef,
  className,
  id,
  user,
}: ReviewsProps) {
  const { data: userReviews } = useGetUserReviews(user._id);
  const reviewsExist = userReviews != undefined;
  let reviewCount;
  if (reviewsExist) {
    reviewCount = userReviews.length;
  } else {
    reviewCount = 0;
  }
  return (
    <article id={id} ref={sectionRef} className={className}>
      <h1 className="font-semibold duration-300">Reviews</h1>
      <div
        className={`grid grid-cols-1 gap-3 duration-300 m_window:grid-cols-2 l_window:grid-cols-${reviewCount} xxl_window:grid-cols-3`}
      >
        {reviewsExist ? (
          reviewCount > 0 ? (
            userReviews.map((review: any, ind: React.Key) => (
              <UserReviewCard
                id={ind}
                key={review.tour.name}
                _id={review.tour._id}
                review={review.review}
                name={review.tour.name}
                imageCover={review.tour.imageCover}
                className="relative w-full overflow-hidden rounded-2xl duration-300 hover:scale-105"
              />
            ))
          ) : (
            <h2>No Reviews Yet!</h2>
          )
        ) : (
          <h2>No Reviews Yet!</h2>
        )}
      </div>
    </article>
  );
}
