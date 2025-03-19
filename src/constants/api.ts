import { ApisauceConfig } from 'apisauce';

export const DEFAULT_STALE_TIME = 60_000;

export const API_TIMEOUT = 10_000;
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const API_DEFAULT_HEADERS: ApisauceConfig['headers'] = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};
