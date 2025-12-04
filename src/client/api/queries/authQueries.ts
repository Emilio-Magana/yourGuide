import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

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
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: Infinity,
  });
}
export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      const { data } = await api.post("/users/login", credentials);
      return data;
    },
    onSuccess: (data) => {
      if (data.token) {
        localStorage.setItem("token", data.token);
      }
      queryClient.setQueryData(["authUser"], data.data?.user || data.user);
      navigate(-1);
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
      localStorage.removeItem("token");
      queryClient.setQueryData(["authUser"], null);
      queryClient.clear();
      navigate("/");
    },
  });
}
