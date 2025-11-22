import { FaAngleDoubleLeft, FaAngleDoubleRight, FaStar } from "react-icons/fa";
import { useMemo, useState } from "react";

import type { sortOrder } from "../../components/admin/DatabaseManager";
import type { Review } from "../../config/schema";

interface Props {
  reviews: Review[];
}

export default function TourReviewsDB({ reviews }: Props) {
  const [reviewSortOrder, setReviewSortOrder] = useState<sortOrder>("asc");
  const sortedReviews = useMemo(() => {
    if (!reviews) return [];
    return [...reviews].sort((a, b) => {
      if (reviewSortOrder === "asc") {
        return a.rating - b.rating;
      } else {
        return b.rating - a.rating;
      }
    });
  }, [reviews, reviewSortOrder]);
  return (
    <div className="border-t border-secondary px-2 py-4">
      <div className="flex items-center justify-between">
        <h3 className="text-md font-medium text-primary">
          Reviews ({reviews?.length || 0}):
        </h3>
        {reviews && reviews.length > 0 && (
          <button
            onClick={() =>
              setReviewSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
            }
            className="flex items-center gap-1 rounded border border-gray-300 bg-mainBg px-2 py-1 text-sm text-primary duration-200 hover:-translate-y-[2px] hover:drop-shadow-[0_2px_1.2px_var(--primary)]"
          >
            <FaStar size={12} />
            {reviewSortOrder === "asc" ? (
              <span className="flex items-center gap-1">
                Low <FaAngleDoubleRight /> High
              </span>
            ) : (
              <span className="flex items-center gap-1">
                Low <FaAngleDoubleLeft /> High
              </span>
            )}
          </button>
        )}
      </div>
      {sortedReviews && sortedReviews.length > 0 ? (
        <div className="space-y-3">
          {sortedReviews.map((review) => (
            <div key={review._id} className="flex gap-3 rounded">
              <div className="flex-1">
                <div className="mb-1 flex items-center gap-2">
                  <p className="text-sm font-medium text-headerBegBg">
                    {review.user?.name}
                  </p>
                </div>
                <p className="mt-1 text-sm text-primary">{review.review}</p>
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex">
                    {Array.from({ length: 5 }, (_, i) => (
                      <FaStar
                        key={i}
                        size={16}
                        className={`${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-medium text-gray-600">
                    {review.rating}/5
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500">No reviews yet for this tour.</p>
      )}
    </div>
  );
}
