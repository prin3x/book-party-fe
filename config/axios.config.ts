import axios from "axios";
import appConfig from "./app.config";

axios.interceptors.request.use(async (config: any) => {
  config.baseURL = appConfig.NEXT_PUBLIC_API_URL;
  const signToken = localStorage.getItem("token");
  if (signToken !== null) {
    config.headers["Authorization"] = `Bearer ${signToken}`;
  }
  return config;
});

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    if (
      (error?.response?.status && error?.response?.status === 403) ||
      error?.response?.status === 401
    ) {
      window.location.replace("/login");
    }
    return Promise.reject(error);
  }
);

export default axios;
