import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../api";
import { useNavigate } from "react-router-dom";

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
