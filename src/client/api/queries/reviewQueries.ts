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
      review,
      rating,
    }: {
      tourId: string;
      review: string;
      rating: number;
    }) => {
      const { data } = await api.post(`/tours/${tourId}/reviews`, {
        review,
        rating,
      });
      return data.data.data;
    },
  });
}
