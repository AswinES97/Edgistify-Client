import axios from "axios";

const baseUrl = axios.create({
  baseURL: "http://localhost:4000/v1",
});

baseUrl.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.log("Error in interceptor");
    return Promise.reject(error);
  }
);

baseUrl.interceptors.response.use((config) => {
  // redirect to login page
  if (config.status === 401) {
    localStorage.removeItem("token");
  }
  return config;
});

export default baseUrl;
