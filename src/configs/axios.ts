//libraries
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";

// axios.defaults.baseURL = "http://test.ir";

axios.interceptors.request.use((config) => {
  return config;
});

axios.interceptors.response.use(
  (res) => res,
  (error: AxiosError) => {
    if (error.code === "ERR_NETWORK") {
      toast.error("خطای داخلی رخ داده است.");
      return;
    }

    const { status } = error.response!;
    switch (status) {
      case 400:
        toast.error("400");
        break;

      case 401:
        toast.error(
          "توکن شما منقضی شده است، لطفا دوباره وارد حساب کاربری خود شوید."
        );
        break;

      case 500:
        toast.error("خطای سیستمی رخ داده است.");
        break;
      default:
        if (status !== 404) toast.error("خطای داخلی رخ داده است.");
    }
    return Promise.reject(error);
  }
);
