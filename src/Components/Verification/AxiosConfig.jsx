import axios from "axios";
import Cookies from "js-cookie";
import { getToken } from "./TokenService";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

api.interceptors.request.use(
  (config) => {
    // const token = Cookies.get("authToken");
    const token = getToken();
    console.log("Token sent in request:", token);

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
