import { useGetTourReviews } from "../../api/queries/reviewQueries";
import type { Tour } from "../../config/schema";

import { useMemo, useState } from "react";

import { FaAngleDoubleLeft, FaAngleDoubleRight, FaStar } from "react-icons/fa";
import { HashLink } from "react-router-hash-link";

export function TourWithReviews({ tour }: { tour: Tour }) {
  const { data: reviews } = useGetTourReviews(tour._id);
  const [reviewSortOrder, setReviewSortOrder] = useState<"asc" | "desc">("asc");

  // Sort reviews by rating
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
    <div className="h-96 overflow-scroll rounded-lg border border-gray-200 p-4 transition-shadow hover:shadow-md">
      <div className="mb-4">
        <div className="flex items-start justify-between">
          <div>
            <HashLink
              smooth
              to={`/tours/${tour._id}`}
              className="text-xl font-semibold text-blue-600"
            >
              {tour.name}
            </HashLink>
          </div>
          {tour.ratingsAverage && (
            <div className="flex items-center gap-1 rounded-lg bg-yellow-50 px-3 py-1">
              <FaStar size={16} className="fill-yellow-500 text-yellow-500" />
              <span className="font-semibold text-yellow-700">
                {tour.ratingsAverage.toFixed(1)}
              </span>
              <span className="text-xs text-gray-500">
                ({tour.ratingsQuantity || 0})
              </span>
            </div>
          )}
        </div>
      </div>
      <div className="border-t pt-4">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-medium text-primary">
            User Reviews ({reviews?.length || 0}):
          </h3>
          {reviews && reviews.length > 0 && (
            <button
              onClick={() =>
                setReviewSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
              }
              className="flex items-center gap-1 rounded border border-gray-300 px-2 py-1 text-xs text-primary duration-300 hover:-translate-y-1"
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
              <div
                key={review._id}
                className="flex gap-3 rounded bg-gray-50 p-3"
              >
                <div className="flex-1">
                  <div className="mb-1 flex items-center gap-2">
                    <p className="text-sm font-medium text-gray-900">
                      {review.user?.name || "Anonymous"}
                    </p>
                    <span className="text-xs text-gray-500">
                      ({review.user?.email})
                    </span>
                  </div>
                  <p className="text-sm text-gray-700">{review.review}</p>
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
    </div>
  );
}
