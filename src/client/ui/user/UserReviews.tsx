import { useGetUserReviews } from "../../api/queries/reviewQueries";
import type { UserSection } from "../SectionNavigator";
import UserReviewCard from "./UserReviewCard";

export default function UserReviews({ sectionRef, id, user }: UserSection) {
  const { data: reviews } = useGetUserReviews(user?._id || "");

  return (
    <article
      id={id}
      ref={sectionRef}
      className="flex scroll-mt-24 flex-col gap-5"
    >
      <h1 className="user-section-primary">Reviews</h1>
      <div
        className={`grid grid-cols-1 gap-3 duration-300 m_window:grid-cols-2 l_window:grid-cols-3`}
      >
        {reviews && reviews.length > 0 ? (
          reviews.map((review) => (
            <UserReviewCard
              key={review.tour.name}
              _id={review.tour._id}
              review={review.review}
              name={review.tour.name}
              imageCover={review.tour.imageCover}
            />
          ))
        ) : (
          <h2>No Reviews Yet!</h2>
        )}
      </div>
    </article>
  );
}
