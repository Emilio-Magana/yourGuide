import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  console.log("🔑 Token from localStorage:", token); // Add this
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  console.log("📤 Request headers:", config.headers); // Add this
  return config;
});
