// src/context/axiosInstance.js

import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const createAxiosInstance = (logout) => {
  const axiosInstance = axios.create({
    baseURL: BACKEND_URL,
  });

  // Add Authorization header
  axiosInstance.interceptors.request.use(
    (config) => {
      const tokens = JSON.parse(localStorage.getItem("authTokens"));
      if (tokens?.access) {
        config.headers.Authorization = `Bearer ${tokens.access}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Handle 401 + refresh flow
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        const tokens = JSON.parse(localStorage.getItem("authTokens"));
        if (!tokens?.refresh) {
          logout(); // no refresh token → log out
          return Promise.reject(error);
        }

        try {
          const res = await axios.post(`${BACKEND_URL}/api/token/refresh/`, {
            refresh: tokens.refresh,
          });

          tokens.access = res.data.access;
          localStorage.setItem("authTokens", JSON.stringify(tokens));

          originalRequest.headers.Authorization = `Bearer ${tokens.access}`;
          return axiosInstance(originalRequest);
        } catch (err) {
          logout(); // refresh failed → log out
          return Promise.reject(err);
        }
      }

      return Promise.reject(error);
    }
  );

  return axiosInstance;
};
