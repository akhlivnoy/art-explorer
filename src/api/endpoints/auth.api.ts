import { apiClient } from '../apiClient';

export const AuthApi = {
  login: () => apiClient.get(''),
  logout: () => apiClient.post(''),
};
