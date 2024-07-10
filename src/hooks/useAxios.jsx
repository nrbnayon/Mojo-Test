import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
});

const useAxios = () => {
  const navigate = useNavigate();
  const { logOut } = useAuth();
  useEffect(() => {
    const requestInterceptor = axiosSecure.interceptors.request.use((req) => {
      const token = localStorage.getItem("access-token");
      if (token) {
        req.headers.authorization = `Bearer ${token}`;
      }
      return req;
    });

    const responseInterceptor = axiosSecure.interceptors.response.use(
      (res) => res,
      async (error) => {
        if (error.response.status === 401 || error.response.status === 403) {
          await logOut()
            .then(() => {})
            .catch((error) => console.error(error));
          navigate("/login");

          toast.warn("Unauthorized Action");
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [logOut, navigate]);

  return axiosSecure;
};

export default useAxios;
