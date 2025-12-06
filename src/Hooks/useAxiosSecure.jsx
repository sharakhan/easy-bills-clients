import axios from "axios";
import { use } from "react";
import { AuthContext } from "../context/AuthContext";

const instanceSecure = axios.create({
  baseURL: "http://localhost:3000",
});

const useAxiosSecure = () => {
  const { user } = use(AuthContext);
  instanceSecure.interceptors.request.use((config) => {
    config.headers.authorization = user?.accessToken;
    return config;
  });
  return instanceSecure;
};

export default useAxiosSecure;