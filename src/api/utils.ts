import { queryOptions, UnusedSkipTokenOptions } from '@tanstack/react-query';
import { ApiResponse } from 'apisauce';

import { StrictOmit } from '@/types/strictOmit';

import { ApiError, ApiErrorResponse, NotFoundError } from './types/api.types';

export const handleApiResponse = <T>(response: ApiResponse<T, ApiErrorResponse>) => {
  if (!response.ok && response.status === 404) {
    throw new NotFoundError(response.data?.message);
  }

  if (!response.ok) {
    throw new ApiError(response.data?.message ?? response.originalError.message);
  }

  if (!response.data) {
    throw new ApiError('');
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
