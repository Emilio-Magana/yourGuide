import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "./api";
import { useLocation, useNavigate } from "react-router-dom";

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
export function useGetBooking(id: string) {
  return useQuery({
    queryKey: ["booking", id],
    queryFn: async () => {
      const { data } = await api.get(`/bookings/${id}`);
      return data.data.data;
    },
  });
}
// Tours (public)
export function useGetTours() {
  return useQuery({
    queryKey: ["tours"],
    queryFn: async () => {
      const { data } = await api.get("/tours");
      // Unwrap nested shape → return pure array
      return data.data.data;
    },
  });
}
export function useGetReviews(tourId: string) {
  return useQuery({
    queryKey: ["reviews", tourId],
    queryFn: async () => {
      const { data } = await api.get(`/tours/${tourId}/reviews`);
      // Unwrap the nested response → return pure array
      return data.data.data;
    },
    enabled: !!tourId, // only run when tourId exists
  });
}

export function useGetTour(tourId: string) {
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

// create tour (restricted to admin/lead-guide)
export function useCreateTour() {
  return useMutation({
    mutationFn: async (newTour: any) => {
      const { data } = await api.post("/tours", newTour);
      return data.data.data;
    },
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

export function useAuth() {
  return useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const { data } = await api.get("/users/me");
        return data.data.data;
      } catch (error: any) {
        if (error.response?.status === 401 || error.response?.status === 403) {
          return null;
        }
        return null;
      }
    },
    retry: false,
    staleTime: 1000 * 60 * 5,
  });
}

// login
export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();

  return useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      const { data } = await api.post("/users/login", { email, password });
      return data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["authUser"], data.data?.user || data.user);
      const from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });
    },
  });
}

// export function useLogout() {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: async () => {
//       await api.get("/users/logout");
//     },
//     onSuccess: () => {
//       queryClient.setQueryData(["authUser"], null);
//       queryClient.removeQueries({ queryKey: ["bookings"] });
//       queryClient.removeQueries({ queryKey: ["tours"] });
//     },
//   });
// }

export function useLogout() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      await api.get("/users/logout");
    },
    onSuccess: () => {
      queryClient.setQueryData(["authUser"], null);
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      queryClient.invalidateQueries({ queryKey: ["tours"] });
    },
  });
}
