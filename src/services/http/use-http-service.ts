import { useMutation, useQuery } from '@tanstack/react-query';
import type { UseQueryOptions } from '@tanstack/react-query';
import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { useApiInstance } from '@/services/http/api.ts';

interface UseGetHttpServiceOptions<TParams, TResponse>
  extends Omit<UseQueryOptions<TResponse, AxiosError>, 'queryFn'> {
  url: string;
  params?: TParams;
}

interface UseOtherHttpServiceOptions {
  url: string;
  method: 'POST' | 'PUT' | 'DELETE';
}

export function useHttpQueryService<TResponse = unknown, TParams = {}>({
  url,
  params,
  ...options
}: UseGetHttpServiceOptions<TParams, TResponse>) {
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

export function useHttpMutationService<TRequestData, TResponse>(
  options: UseOtherHttpServiceOptions,
  config: Omit<AxiosRequestConfig<TRequestData>, 'method' | 'data'> = {},
) {
  const apiInstance = useApiInstance();

  return useMutation({
    mutationFn: (data?: TRequestData): Promise<AxiosResponse<TResponse, AxiosError>> =>
      apiInstance(options.url, { method: options.method, data, ...config }),
  });
}
