import axios from "axios";
import { getToken, setToken, removeToken } from "./TokenService";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle expired access tokens
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Prevent infinite retries
      try {
        const { data } = await axios.post(
          "http://localhost:8080/api/refresh",
          {},
          { withCredentials: true } // Send cookies (refresh token)
        );

        const newAccessToken = data.data.accessToken;
        setToken(newAccessToken);

        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (err) {
        console.error("Token refresh failed:", err);
        removeToken();
      }
    }

    return Promise.reject(error);
  }
);

export default api;
