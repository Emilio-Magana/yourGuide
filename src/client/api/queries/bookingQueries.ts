import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "../api";

export function useBookings() {
  return useQuery({
    queryKey: ["bookings"],
    queryFn: async () => {
      const { data } = await api.get("/bookings");
      return data.data.data;
    },
  });
}
export function useGetBooking(id: string) {
  return useQuery({
    queryKey: ["booking", id],
    queryFn: async () => {
      const { data } = await api.get(`/bookings/${id}`);
      return data.data.data;
    },
  });
}
export function useCreateBooking() {
  return useMutation({
    mutationFn: async (newBooking: any) => {
      const { data } = await api.post("/bookings", newBooking);
      return data.data.data;
    },
  });
}

export function useGetUserBookings(userId: string) {
  return useQuery({
    queryKey: ["user-bookings", userId],
    queryFn: async () => {
      const { data } = await api.get(`/users/${userId}/bookings`);
      return data.data.data;
    },
    enabled: !!userId, // only run when tourId exists
  });
}
