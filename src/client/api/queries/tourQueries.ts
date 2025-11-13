import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Tour } from "../../config/schema";
import { api } from "../api";

export function useGetTours() {
  return useQuery<Tour[]>({
    queryKey: ["tours"],
    queryFn: async () => {
      const { data } = await api.get("/tours");
      return data.data.data;
    },
  });
}
export function useGetTour(tourId: string) {
  return useQuery<Tour>({
    queryKey: ["tour", tourId],
    queryFn: async () => {
      const { data } = await api.get(`/tours/${tourId}`);
      return data.data.data;
    },
    enabled: !!tourId,
  });
}
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
