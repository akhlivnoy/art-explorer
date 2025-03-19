import { create } from 'apisauce';

import { API_BASE_URL, API_DEFAULT_HEADERS, API_TIMEOUT } from '@/constants/api';

export const apiClient = create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: API_DEFAULT_HEADERS,
});
