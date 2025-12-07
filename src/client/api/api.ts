import axios from "axios";

//used to be https:://localhost:3000/api/v1

export const api = axios.create({
  baseURL: "https://yourguide.onrender.com",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
