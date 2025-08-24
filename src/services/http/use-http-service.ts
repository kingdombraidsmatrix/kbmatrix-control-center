import { useMutation, useQuery } from '@tanstack/react-query';
import type { AxiosError, AxiosResponse } from 'axios';
import { useApiInstance } from '@/services/http/api.ts';

interface UseGetHttpServiceOptions {
  url: string;
  method: 'GET';
  queryKey: Array<string>;
  params?: any;
}

interface UseOtherHttpServiceOptions {
  url: string;
  method: 'POST' | 'PUT' | 'DELETE';
}

type UseHttpServiceOptions = UseGetHttpServiceOptions | UseOtherHttpServiceOptions;

export function useHttpService<TRequestData, TResponse>(options: UseHttpServiceOptions) {
  const apiInstance = useApiInstance();

  if (options.method === 'GET') {
    return useQuery({
      queryKey: options.queryKey,
      queryFn: () =>
        apiInstance.get<unknown, AxiosResponse<TResponse>, AxiosError>(options.url, {
          params: options.params ?? {},
        }),
    });
  }

  return useMutation({
    mutationFn: (data?: TRequestData): Promise<AxiosResponse<TResponse, AxiosError>> =>
      apiInstance(options.url, { method: options.method, data }),
  });
}
