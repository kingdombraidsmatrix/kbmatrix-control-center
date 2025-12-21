import { useMutation, useQuery } from '@tanstack/react-query';
import type { UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';
import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { useApiInstance } from '@/services/http/api.ts';
import { useMemo } from 'react';

interface UseGetHttpServiceOptions<TParams, TResponse, TResponseData = TResponse>
  extends Omit<UseQueryOptions<TResponse, AxiosError, TResponseData>, 'queryFn'> {
  url: string;
  params?: TParams;
}

interface UseOtherHttpServiceOptions {
  url: string;
  method: 'POST' | 'PUT' | 'DELETE';
}

export function useHttpQueryService<TResponse = unknown, TParams = {}, TResponseData = TResponse>({
  url,
  params,
  ...options
}: UseGetHttpServiceOptions<TParams, TResponse, TResponseData>) {
  const apiInstance = useApiInstance();

  return useQuery({
    queryFn: () =>
      apiInstance
        .get<TParams, AxiosResponse<TResponse>, AxiosError>(url, {
          params: params ?? {},
          paramsSerializer: { indexes: null },
        })
        .then((res) => res.data),
    refetchOnWindowFocus: false,
    retry: 3,
    staleTime: 60_000,
    ...options,
  });
}

type OptionsBaseParams<TRequestData, TResponse> = UseOtherHttpServiceOptions &
  Omit<UseMutationOptions<AxiosResponse<TResponse, AxiosError>, Error, TRequestData>, 'mutationFn'>;

export function useHttpMutationService<TRequestData, TResponse>(
  optionsParam:
    | OptionsBaseParams<TRequestData, TResponse>
    | ((data?: TRequestData | void) => OptionsBaseParams<TRequestData, TResponse>),
  config: Omit<AxiosRequestConfig<TRequestData>, 'method' | 'data'> = {},
) {
  const apiInstance = useApiInstance();

  const options = useMemo(() => {
    if (typeof optionsParam === 'function') {
      return optionsParam();
    }
    return optionsParam;
  }, [optionsParam]);

  return useMutation({
    ...options,
    mutationFn: (data?: TRequestData | void) => {
      const opts = typeof optionsParam === 'function' ? optionsParam(data) : optionsParam;
      return apiInstance<TResponse>(opts.url, { method: opts.method, data, ...config });
    },
  });
}
