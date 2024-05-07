import { useState, useEffect, useMemo } from "react";
import { request } from "../apis";

const requestList: Record<string, [string, object | null, boolean]> = {};
const event = new Event("fetch");

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
