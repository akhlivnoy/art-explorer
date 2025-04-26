import { queryOptions, UnusedSkipTokenOptions, useMutation, UseMutationOptions } from '@tanstack/react-query';
import { ApiResponse } from 'apisauce';

import { StrictOmit } from '@/types/strictOmit';

import { ApiError, ApiErrorResponse, NotFoundError } from './types/api.types';

export const handleApiResponseErrors = <T>(response: ApiResponse<T, unknown>) => {
  if (!response.ok) {
    const message = Array.isArray(response.data)
      ? response.data.map(item => (item as { description?: string }).description ?? 'Unknown error').join('\n')
      : ((response.data as { message?: string })?.message ?? response.originalError?.message ?? 'Unknown error');

    switch (response.status) {
      case 404:
        throw new NotFoundError(message);
      default:
        throw new ApiError(message);
    }
  }
  return response;
};

export const handleApiResponse = <T>(response: ApiResponse<T, ApiErrorResponse>) => {
  response = handleApiResponseErrors(response);

  if (!response.data) {
    throw new ApiError('No data received');
  }

  return response.data;
};

export const createQueryOptions =
  <TQueryFnData, TQueryFnDataParams, TError = ApiErrorResponse, TData = Awaited<TQueryFnData>>(
    queryKey: string,
    queryFn: (params?: TQueryFnDataParams) => TQueryFnData,
    additionalOptions?: StrictOmit<UnusedSkipTokenOptions<TQueryFnData, TError, TData>, 'queryKey' | 'queryFn'>,
  ) =>
  (params: TQueryFnDataParams) =>
    queryOptions({
      queryKey: [queryKey, params],
      queryFn: () => queryFn(params),
      ...additionalOptions,
    });

export const useApiMutation = <TData = unknown, TError = ApiErrorResponse, TVariables = void>(
  options: UseMutationOptions<TData, TError, TVariables>,
) => useMutation<TData, TError, TVariables>(options);
