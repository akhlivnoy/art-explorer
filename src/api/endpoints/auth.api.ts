import { apiClient } from '../apiClient';
import { ApiErrorResponse } from '../types/api.types';
import { LoginBody, LoginSuccessResponse, RegisterBody, RegisterSuccessResponse } from '../types/auth.types';
import { handleApiResponse, handleApiResponseErrors } from '../utils';

export const AuthApi = {
  login: async (body: LoginBody) => {
    const response = await apiClient.post<LoginSuccessResponse, ApiErrorResponse>('sign-in', body);
    return handleApiResponse(response);
  },
  register: async (body: RegisterBody) => {
    const response = await apiClient.post<RegisterSuccessResponse, ApiErrorResponse>('sign-up', body);
    return handleApiResponse(response);
  },
  logout: async () => {
    const response = await apiClient.post<undefined, ApiErrorResponse>('logout');
    return handleApiResponseErrors(response).data;
  },
};
