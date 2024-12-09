import axios  from "axios";

const baseUrl = axios.create({
  baseURL: "https://apiedge.aswines.online/v1",
});

baseUrl.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers["authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.log("Error in interceptor");
    return Promise.reject(error);
  }
);


export default baseUrl;
