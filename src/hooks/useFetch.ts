//libraries
import { useState, useEffect, useMemo } from "react";
import { request } from "../apis";
import { debounce } from "lodash";

//interfaces
interface APIOPERATION {
  data: object | null;
  loading: boolean;
}

type SETDATACALLBACK = (data: object | null) => void;
type SETLOADINGCALLBACK = (data: boolean) => void;

//global variables
const requestList: Record<
  string,
  (
    paramStringify: string,
    force: boolean,
    dataCallback: SETDATACALLBACK,
    loadingCallback: SETLOADINGCALLBACK
  ) => void
> = {};

const fetchOperation = function (url: string) {
  let currentParams: string = "";
  let loading = false;
  let currentData: object | null = null;
  const event = new Event(`fetch-${url}`);

  return function (
    paramStringify: string,
    force: boolean,
    dataCallback: SETDATACALLBACK,
    loadingCallback: SETLOADINGCALLBACK
  ): APIOPERATION {
    const debounce_fun = debounce(function () {
      if (currentParams !== paramStringify || force) {
        currentParams = paramStringify;
        loading = true;
        loadingCallback(true);

        request
          .get<object, object>(url, {})
          .then((response) => {
            currentData = response;
            window.dispatchEvent(event);
          })
          .catch((error) => {
            currentData = null;
            window.dispatchEvent(event);
          });
      } else {
        if (!loading) window.dispatchEvent(event);
        else {
          loadingCallback(true);
        }
      }
    }, 1000);

    debounce_fun();

    window.addEventListener(
      `fetch-${url}`,
      () => {
        loading = false;
        loadingCallback(false);
        dataCallback(currentData);
      },
      false
    );

    return { data: null, loading: true };
  };
};

const useFetch = (url: string, params: object, force: boolean) => {
  const [data, setData] = useState<object | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const paramStringify = useMemo(() => JSON.stringify(params), [params]);

  useEffect(() => {
    const fetchData = async () => {
      if (!requestList[url]) {
        requestList[url] = fetchOperation(url);
      }

      requestList[url](paramStringify, force, setData, setLoading);
    };

    fetchData();
  }, [url, paramStringify, force]);

  return { data, loading };
};

export default useFetch;
