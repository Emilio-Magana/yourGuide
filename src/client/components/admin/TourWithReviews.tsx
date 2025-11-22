import { useGetTourReviews } from "../../api/queries/reviewQueries";
import TourReviewsDB from "../../ui/admin/TourReviewsDB";
import type { Review, Tour } from "../../config/schema";
import TourAccordion from "../TourAccordian";

export function TourWithReviews({ tour }: { tour: Tour }) {
  const { data: reviews } = useGetTourReviews(tour._id);

  return (
    <div className="bg-mainBg">
      <TourAccordion tour={tour}>
        <TourReviewsDB reviews={reviews as Review[]} />
      </TourAccordion>
    </div>
  );
}
