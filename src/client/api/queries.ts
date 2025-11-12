import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "./api";
import { useLocation, useNavigate } from "react-router-dom";
import type { Review, Tour, User } from "../config/schema";

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
  return useQuery<Tour[]>({
    queryKey: ["tours"],
    queryFn: async () => {
      const { data } = await api.get("/tours");
      // Unwrap nested shape → return pure array
      return data.data.data;
    },
  });
}
export function useGetTourReviews(tourId: string) {
  return useQuery<Review[]>({
    queryKey: ["tour-reviews", tourId],
    queryFn: async () => {
      const { data } = await api.get(`/tours/${tourId}/reviews`);
      // Unwrap the nested response → return pure array
      return data.data.data;
    },
    enabled: !!tourId, // only run when tourId exists
  });
}
export function useGetUserReviews(userId: string) {
  return useQuery<Review[]>({
    queryKey: ["user-reviews", userId],
    queryFn: async () => {
      const { data } = await api.get(`/users/${userId}/reviews`);
      // Unwrap the nested response → return pure array
      return data.data.data;
    },
    enabled: !!userId, // only run when tourId exists
  });
}
export function useGetUserBookings(userId: string) {
  return useQuery({
    queryKey: ["user-bookings", userId],
    queryFn: async () => {
      const { data } = await api.get(`/users/${userId}/bookings`);
      // Unwrap the nested response → return pure array
      return data.data.data;
    },
    enabled: !!userId, // only run when tourId exists
  });
}

export function useGetTour(tourId: string) {
  return useQuery<Tour>({
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
// export function useCreateTour() {
//   return useMutation({
//     mutationFn: async (newTour: any) => {
//       const { data } = await api.post("/tours", newTour);
//       return data.data.data;
//     },
//   });
// }

export function useCreateTour() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newTour: Tour) => {
      const { data } = await api.post("/tours", newTour, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return data.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tours"] });
    },
  });
}

export function useUpdateTour() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const response = await api.patch(`/tours/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data.data.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["tours"] });
      queryClient.invalidateQueries({ queryKey: ["tour", variables.id] });
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

// useGetMe = useAuth
export function useAuth() {
  const navigate = useNavigate();

  return useQuery<User>({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const { data } = await api.get("/users/me");
        return data.data.data;
      } catch (error: any) {
        if (error.response?.status === 401 || error.response?.status === 403) {
          // Redirect to login on auth failure
          navigate("/login");
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

// Update current user profile
export function useUpdateMe() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userData: {
      name: string;
      email: string;
      phone?: string;
      address?: string;
      photo?: File;
    }) => {
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("email", userData.email);
      if (userData.phone) formData.append("phone", userData.phone);
      if (userData.address) formData.append("address", userData.address);
      if (userData.photo) formData.append("photo", userData.photo);

      const { data } = await api.patch("/users/updateMe", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return data.data.user;
    },
    onSuccess: (updatedUser) => {
      // Update the authUser cache with new user data
      queryClient.setQueryData(["authUser"], updatedUser);
    },
  });
}
// Update user password
export function useUpdatePassword() {
  return useMutation({
    mutationFn: async (passwords: {
      passwordCurrent: string;
      password: string;
      passwordConfirm: string;
    }) => {
      const { data } = await api.patch("/users/updateMyPassword", passwords);
      return data;
    },
  });
}

export function useDeleteMe() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async () => {
      await api.delete("/users/deleteMe");
    },
    onSuccess: () => {
      queryClient.setQueryData(["authUser"], null);
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      navigate("/");
    },
  });
}
