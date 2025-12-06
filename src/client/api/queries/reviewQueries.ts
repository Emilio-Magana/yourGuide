import { useMutation, useQuery } from "@tanstack/react-query";
import type { Review } from "../../config/schema";
import { api } from "../api";

export function useGetTourReviews(tourId: string) {
  return useQuery<Review[]>({
    queryKey: ["tour-reviews", tourId],
    queryFn: async () => {
      const { data } = await api.get(`/tours/${tourId}/reviews`);
      return data.data.data;
    },
    enabled: !!tourId,
  });
}
export function useGetUserReviews(userId: string) {
  return useQuery<Review[]>({
    queryKey: ["user-reviews", userId],
    queryFn: async () => {
      const { data } = await api.get(`/users/${userId}/reviews`);
      return data.data.data;
    },
    enabled: !!userId,
  });
}
export function useGetAllReviews() {
  return useQuery<Review[]>({
    queryKey: ["all-reviews"],
    queryFn: async () => {
      const { data } = await api.get("/reviews");
      return data.data.data;
    },
  });
}

export function useCreateReview() {
  return useMutation({
    mutationFn: async ({
      tourId,
      title,
      review,
      rating,
      whenTheyWent,
      reviewImages,
    }: {
      tourId: string;
      title: string;
      review: string;
      rating: number;
      whenTheyWent: Date;
      reviewImages?: File[];
    }) => {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("review", review);
      formData.append("rating", rating.toString());
      formData.append("whenTheyWent", whenTheyWent.toISOString());

      if (reviewImages) {
        reviewImages.forEach((file) => {
          formData.append("reviewImages", file);
        });
      }

      const { data } = await api.post(`/tours/${tourId}/reviews`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return data.data.data;
    },
  });
}
