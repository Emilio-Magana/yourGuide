import type { Review } from "../../config/schema";
import { FaStar } from "react-icons/fa";

export default function UserReviewsDB({ reviews }: { reviews: Review[] }) {
  return (
    <div className="border-t border-secondary p-4">
      <h3 className="mb-2 text-sm font-bold text-primary">Reviews:</h3>
      {reviews && reviews.length > 0 ? (
        <div className="space-y-3">
          {reviews.map((review) => (
            <div key={review._id} className="rounded">
              <p className="font-medium text-headerBegBg">
                {review.tour?.name || "Unknown Tour"}
              </p>
              <p className="mt-1 text-sm text-primary">{review.review}</p>
              <div className="mt-2 flex items-center gap-2">
                <div className="flex">
                  {Array.from({ length: 5 }, (_, i) => (
                    <FaStar
                      key={i}
                      className={`h-3 w-3 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-500">{review.rating}/5</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500">
          User has not made any reviews yet!
        </p>
      )}
    </div>
  );
}
