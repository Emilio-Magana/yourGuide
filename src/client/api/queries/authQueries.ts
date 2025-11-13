import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";

import type { User } from "../../config/schema";
import { api } from "../api";

export function useAuth() {
  return useQuery<User>({
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
    refetchOnWindowFocus: false, // Stop refetching on window focus
    refetchOnMount: false, // Stop refetching on component mount
    staleTime: Infinity, // Cache forever until manually invalidated
  });
}
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
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async () => {
      await api.get("/users/logout");
    },
    onSuccess: () => {
      queryClient.setQueryData(["authUser"], null);
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      queryClient.invalidateQueries({ queryKey: ["tours"] });
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      navigate("/");
    },
  });
}
