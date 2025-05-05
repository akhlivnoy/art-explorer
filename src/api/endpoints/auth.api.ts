import { apiClient } from '../apiClient';
import { User } from '../models/user';
import { ApiErrorResponse } from '../types/api.types';
import { LoginBody, LoginSuccessResponse, RegisterBody, RegisterSuccessResponse } from '../types/auth.types';
import { handleApiResponse, handleApiResponseErrors } from '../utils';

const AUTH_ENDPOINT = '/api/Account';

export const AuthApi = {
  login: async (body: LoginBody) => {
    const response = await apiClient.post<LoginSuccessResponse, ApiErrorResponse>(`${AUTH_ENDPOINT}/login`, body);

    const data = handleApiResponse(response);
    const user: User = {
      username: data.username,
      id: data.id,
    };

    return { user: user };
  },
  register: async (body: RegisterBody) => {
    const response = await apiClient.post<RegisterSuccessResponse, ApiErrorResponse>(`${AUTH_ENDPOINT}/register`, body);

    const data = handleApiResponse<RegisterSuccessResponse>(response);
    const user: User = {
      id: data.id,
      username: data.username,
    };

    return { user };
  },
  logout: async () => {
    return null;
    const response = await apiClient.post<undefined, ApiErrorResponse>('logout');
    return handleApiResponseErrors(response).data;
  },
};
