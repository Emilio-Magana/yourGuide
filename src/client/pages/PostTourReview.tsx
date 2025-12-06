import React, { useState } from "react";
import { BsSave } from "react-icons/bs";
import { FaChildReaching } from "react-icons/fa6";
import { FaImages, FaCalendarDay } from "react-icons/fa";
import { useCreateReview } from "../api/queries/reviewQueries";
import { Link, useParams } from "react-router-dom";
import { useGetTour } from "../api/queries/tourQueries";
import PathFinderLoader from "../components/PathFinderLoader";

const api_url = import.meta.env.VITE_API_URL;

const ratingLabels: Record<number, string> = {
  1: "Terrible",
  2: "Poor",
  3: "Average",
  4: "Very Good",
  5: "Excellent",
};

export default function PostTourReview() {
  const { tourId } = useParams();
  const { data: tour, isLoading: tourIsLoading } = useGetTour(tourId!);
  const createReviewMutation = useCreateReview();
  const [hoveredRating, setHoveredRating] = useState(0);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [reviewImagesFiles, setReviewImagesFiles] = useState<File[]>([]);
  const [reviewImagesPreview, setReviewImagesPreview] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    review: "",
    rating: 0,
    whenTheyWent: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRatingClick = (rating: number) => {
    setFormData((prev) => ({ ...prev, rating }));
  };

  const handleReviewImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 3) {
      setMessage({ type: "error", text: "Maximum 3 images allowed" });
      return;
    }

    const validFiles = files.filter((f) => f.type.startsWith("image/"));
    if (validFiles.length !== files.length) {
      setMessage({ type: "error", text: "Please upload only images" });
      return;
    }

    setReviewImagesFiles(validFiles);
    const previews: string[] = [];
    validFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        previews.push(reader.result as string);
        if (previews.length === validFiles.length) {
          setReviewImagesPreview(previews);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async () => {
    setMessage({ type: "", text: "" });

    // Validation
    if (formData.rating === 0) {
      setMessage({ type: "error", text: "Please select a rating" });
      return;
    }

    if (!formData.title || !formData.review || !formData.whenTheyWent) {
      setMessage({ type: "error", text: "Please fill in all required fields" });
      return;
    }

    try {
      await createReviewMutation.mutateAsync({
        tourId: tour!._id,
        title: formData.title,
        review: formData.review,
        rating: formData.rating,
        whenTheyWent: new Date(formData.whenTheyWent),
        reviewImages:
          reviewImagesFiles.length > 0 ? reviewImagesFiles : undefined,
      });

      setMessage({
        type: "success",
        text: "Review submitted successfully!",
      });

      // Reset form
      setTimeout(() => {
        setFormData({
          title: "",
          review: "",
          rating: 0,
          whenTheyWent: "",
        });
        setReviewImagesFiles([]);
        setReviewImagesPreview([]);
        setMessage({ type: "", text: "" });
      }, 2000);
    } catch (err: any) {
      setMessage({
        type: "error",
        text: err.message || "Failed to submit review",
      });
    }
  };

  const displayRating = hoveredRating || formData.rating;

  if (tourIsLoading) return <PathFinderLoader />;

  return (
    <section className="mt-[70px] flex flex-col gap-5 text-primary l_window:flex-row l_window:gap-0">
      <div className="h-[600px] w-full space-y-9 bg-mainBg p-10 l_window:sticky l_window:top-0 l_window:z-40 l_window:w-2/5 l_window:border-r l_window:border-secondary">
        <h1 className="text-6xl font-extrabold text-primary">
          Tell us, how was your visit?
        </h1>

        <div className="w-full rounded-lg border border-secondary p-2">
          <img
            src={`${api_url}/img/tours/${tour!.imageCover}`}
            className="w-full rounded-xl"
            alt={tour!.name}
          />
          <Link to={`/tours/${tour!._id}`}>
            <h1 className="my-2 text-lg font-semibold">{tour!.name}</h1>
          </Link>
        </div>
      </div>

      <div className="w-full bg-mainBg px-10 py-5 l_window:z-40 l_window:w-3/5">
        {message.text && (
          <div
            className={`mb-6 rounded-lg p-4 ${
              message.type === "success"
                ? "border border-green-200 bg-green-50 text-green-800"
                : "border border-red-200 bg-red-50 text-red-800"
            }`}
          >
            {message.text}
          </div>
        )}

        <div className="flex flex-col gap-5">
          <div>
            <label className="mb-2 block text-sm font-medium">
              How would you rate your experience?
            </label>
            <div className="flex items-center gap-3">
              <div className="flex gap-0">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleRatingClick(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    disabled={createReviewMutation.isPending}
                    className="transition-colors disabled:cursor-not-allowed"
                  >
                    {star <= displayRating ? (
                      <FaChildReaching size={34} className="text-green-600" />
                    ) : (
                      <FaChildReaching size={34} className="text-gray-300" />
                    )}
                  </button>
                ))}
              </div>
              {displayRating > 0 && (
                <span className="text-lg font-semibold">
                  {ratingLabels[displayRating]}
                </span>
              )}
            </div>
          </div>

          <div className="w-64">
            <label className="mb-2 block text-sm font-medium">
              <FaCalendarDay size={16} className="mr-2 inline" />
              When did you go?
            </label>
            <input
              type="date"
              name="whenTheyWent"
              value={formData.whenTheyWent}
              onChange={handleInputChange}
              required
              disabled={createReviewMutation.isPending}
              className="input"
            />
            <p className="mt-1 text-xs text-gray-600">
              When did you take this tour?
            </p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Review title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Summarize your experience"
              maxLength={100}
              required
              disabled={createReviewMutation.isPending}
              className="input"
            />
            <div className="mt-1 text-right text-xs text-gray-600">
              {formData.title.length}/100
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Your review
            </label>
            <div className="mb-4 border-l-4 border-primary bg-gray-50 p-4">
              <h4 className="mb-2 font-semibold text-gray-800">
                Tips for writing a great review:
              </h4>
              <ul className="ml-5 list-disc space-y-1 text-sm">
                <li>Share specific details about your experience</li>
                <li>Mention what made it special or unique</li>
                <li>Give helpful advice to future visitors</li>
                <li>Be honest and constructive</li>
              </ul>
            </div>

            <textarea
              name="review"
              value={formData.review}
              onChange={handleInputChange}
              placeholder="Tell others about your experience..."
              required
              rows={6}
              disabled={createReviewMutation.isPending}
              className="input resize-y"
            />
            <div className="mt-1 text-right text-xs text-gray-600">
              {formData.review.length} characters
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              <FaImages size={16} className="mr-2 inline" />
              Add photos (optional)
              <span className="ml-2 font-normal text-gray-600">
                (Maximum 3 images)
              </span>
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleReviewImagesChange}
              disabled={
                reviewImagesFiles.length >= 3 || createReviewMutation.isPending
              }
              className="w-full rounded-lg border border-gray-300 px-4 py-2"
            />
            {reviewImagesPreview.length > 0 && (
              <div className="mt-3 grid grid-cols-3 gap-3">
                {reviewImagesPreview.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`Review ${idx + 1}`}
                    className="h-32 w-full rounded-lg object-cover"
                  />
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={createReviewMutation.isPending}
              className="form-submit-button w-full"
            >
              <BsSave size={16} />
              {createReviewMutation.isPending
                ? "Submitting..."
                : "Submit Review"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
