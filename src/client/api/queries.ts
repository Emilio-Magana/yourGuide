import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "./api";

// all bookings (admin/lead-guide only)
export function useBookings() {
  return useQuery({
    queryKey: ["bookings"],
    queryFn: async () => {
      const { data } = await api.get("/bookings");
      return data.data.data;
    },
  });
}
// create booking
export function useCreateBooking() {
  return useMutation({
    mutationFn: async (newBooking: any) => {
      const { data } = await api.post("/bookings", newBooking);
      return data.data.data;
    },
  });
}
// get booking by id
export function useBooking(id: string) {
  return useQuery({
    queryKey: ["booking", id],
    queryFn: async () => {
      const { data } = await api.get(`/bookings/${id}`);
      return data.data.data;
    },
  });
}
// Tours (public)
export function getTours() {
  return useQuery({
    queryKey: ["tours"],
    queryFn: async () => {
      const { data } = await api.get("/tours");
      // Unwrap nested shape → return pure array
      return data.data.data;
    },
  });
}
export function getTour(tourId: string) {
  return useQuery({
    queryKey: ["tour", tourId],
    queryFn: async () => {
      const { data } = await api.get(`/tours/${tourId}`);
      // Unwrap nested shape → return pure object
      return data.data.data;
    },
    enabled: !!tourId,
  });
}
// Create Review (protected, role=user)
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
// Get Current User (protected)
export function useCurrentUser() {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const { data } = await api.get("/users/me");
      return data.data.data;
    },
    retry: false,
  });
}
// export async function getCurrentUser() {
//   const { data } = await api.get("/users/me"); // protected route
//   return data.data.user; // adjust to your backend response
// }
export function useAuth() {
  return useQuery({
    queryKey: ["authUser"],
    queryFn: useCurrentUser,
    retry: false, // don’t retry if unauthorized
    staleTime: 1000 * 60, // 1 min
  });
}
// login
export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      const { data } = await api.post("/users/login", { email, password });
      localStorage.setItem("token", data.token);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });
}
// create tour (restricted to admin/lead-guide)
export function useCreateTour() {
  return useMutation({
    mutationFn: async (newTour: any) => {
      const { data } = await api.post("/tours", newTour);
      return data.data.data;
    },
  });
}
