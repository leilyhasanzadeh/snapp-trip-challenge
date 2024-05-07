//libraries
import axios, { AxiosError } from "axios";

// axios.defaults.baseURL = "http://test.ir";

axios.interceptors.request.use((config) => {
  return config;
});

axios.interceptors.response.use(
  (res) => res,
  (error: AxiosError) => {
    if (error.code === "ERR_NETWORK") {
      console.error("خطای داخلی رخ داده است.");
      return;
    }

    const { status } = error.response!;
    switch (status) {
      case 400:
        console.error("400");
        break;

      case 401:
        console.error("401");
        break;

      case 500:
        console.error("500");
        break;
      default:
        if (status !== 404) console.error("404");
    }
    return Promise.reject(error);
  }
);
