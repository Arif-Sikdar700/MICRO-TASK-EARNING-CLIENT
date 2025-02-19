import axios from "axios";
import { useNavigate } from "react-router-dom";

const AxiosSecure = axios.create({
  baseURL: "https://micro-task.vercel.app",
});
export default function useAxiosSecure() {
  const navigate = useNavigate()
  AxiosSecure.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem("access-token");
   
      config.headers.authorization = `Bearer ${token}`;
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    function (response) {
      return response;
    },
    async function (error) {
      const status = error.response.status;
      if (status === 401 || status === 403) {
      }
      return Promise.reject(error);
    }
  );
  return AxiosSecure;
}
