import { queryOptions, UnusedSkipTokenOptions, useMutation, UseMutationOptions } from '@tanstack/react-query';
import { ApiResponse } from 'apisauce';

import { StrictOmit } from '@/types/strictOmit';

import { ApiError, ApiErrorResponse, NotFoundError } from './types/api.types';

export const handleApiResponseErrors = <T>(response: ApiResponse<T, ApiErrorResponse>) => {
  if (!response.ok) {
    switch (response.status) {
      case 404:
        throw new NotFoundError(response.data?.message);
      default:
        throw new ApiError(response.data?.message ?? response.originalError.message);
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
