import axios, { AxiosResponse } from "axios";

import { RESPONSE } from "./types";

const responseBody = <T>(response: AxiosResponse<RESPONSE<T>>) => {
  return response.data;
};

const request = {
  get: <T, P extends object>(url: string, params?: P) =>
    axios.get<RESPONSE<T>>(url, { params }).then(responseBody),
};

export { request };
