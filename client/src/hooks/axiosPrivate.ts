import { axiosPrivate } from "@/api/axios";
import { logout } from "@/lib/features/auth/authSlice";
import { useAppDispatch } from "@/lib/hooks";
import { AxiosError } from "axios";

const useAxiosPrivate = () => {
  const dispatch = useAppDispatch();
  axiosPrivate.interceptors.request.use(
    function (config) {
      // Do something before request is sent
      const accessToken = localStorage.getItem("access_token");
      config.headers.Authorization = "Bearer " + accessToken;
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );
  // Add a response interceptor
  axiosPrivate.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    },
    function (error: AxiosError) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      const status = error.response?.status;
      if (status === 401) {
        dispatch(logout());
      }

      return Promise.reject(error);
    }
  );
  return axiosPrivate;
};
export default useAxiosPrivate;
