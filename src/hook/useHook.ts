import{ useEffect, useState } from "react";
import axios from "axios";
import type { AxiosRequestConfig } from "axios"
// fetch untuk external api route
// cara pakai
/*
  const { value: newsData, isLoading: isLoadingPublicAPI } = useFetch(
    `/news/publicnews`,
    (data) => ({
      news: data.results.slice(0,5) as PublicNews[] | undefined,
    }),"GET"
  );
 */function useFetch<T>(
  url: string,
  processData: (data: any) => T,
  method: "GET",
  body?: any,
  headers: Record<string, string> = {}
) {
  const [value, setValue] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const controller = new AbortController();
    setIsLoading(true);

    const config: AxiosRequestConfig = {
      method,
      url: `https://api-berita-indonesia.vercel.app${url}`,
      headers,
      data: body,
      signal: controller.signal,
    };

    axios(config)
      .then((res) => {
        setValue(processData(res.data));
        setIsLoading(false);
      })
      .catch((err) => {
        if (!axios.isCancel(err)) console.error(err);
      });

    return () => controller.abort();
  }, [url]);

  return { value, isLoading };
}

export default useFetch;