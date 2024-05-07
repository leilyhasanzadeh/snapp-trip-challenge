//libraries
import { useState, useEffect, useMemo } from "react";
import { request } from "../apis";
import { debounce } from "lodash";

//interfaces
interface APIOPERATION {
  data: object;
  loading: boolean;
}

//global variables
const requestList: Record<string, APIOPERATION> = {};
const event = new Event("fetch");
const fetchOperation = (function (url: string) {
  // let params: string = "";
  return function (paramStringify: string) {
    const debounce_fun = debounce(function () {
      console.debug("Function debounced after 1000ms!");
    }, 1000);

    debounce_fun();
    return { data: null, loading: true };
  };
})("abcd");

const useFetch = (
  url: string,
  params: object,
  force: boolean,
  component: string
) => {
  const [data, setData] = useState<object | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const paramStringify = useMemo(() => JSON.stringify(params), [params]);

  useEffect(() => {
    const fetchData = async () => {
      if (
        !requestList[url] ||
        requestList[url][0] !== paramStringify ||
        force
      ) {
        fetchOperation("hjkhjh");

        requestList[url] = [paramStringify, null, true];
        setLoading(true);

        request
          .get<object, object>(url, {})
          .then((response) => {
            setData(response);
            setLoading(false);
            requestList[url][1] = response;
            requestList[url][2] = false;
            window.dispatchEvent(event);
          })
          .catch((error) => {
            console.debug("error: ", error);
            requestList[url][2] = false;
            setLoading(false);
            window.dispatchEvent(event);
          });
      } else {
        if (!requestList[url][2]) setData(requestList[url][1]);
        else {
          setLoading(true);
          window.addEventListener(
            "fetch",
            () => {
              setLoading(false);
              setData(requestList[url][1]);
              console.debug("component: ", component);
            },
            false
          );
        }
      }
    };

    fetchData();
  }, [url, paramStringify, force]);

  return { data, loading };
};

export default useFetch;
