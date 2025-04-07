import { ApisauceInstance, create } from 'apisauce';

import { API_BASE_URL, API_DEFAULT_HEADERS, API_TIMEOUT } from '@/constants/api';

import { mockApiClient } from './mockApiClient';

let apiClient: ApisauceInstance;

if (import.meta.env.VITE_USE_MOCK_API === 'true') {
  apiClient = mockApiClient;
} else {
  apiClient = create({
    baseURL: API_BASE_URL,
    timeout: API_TIMEOUT,
    headers: API_DEFAULT_HEADERS,
  });
}

export { apiClient };
