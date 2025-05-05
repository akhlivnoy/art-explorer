import { ApiResponse, ApisauceInstance } from 'apisauce';
import { AxiosError } from 'axios';

import { ApiErrorResponse as DefaultApiErrorResponse, Artwork, PaginationBody } from './types/api.types';
import { LoginBody, LoginSuccessResponse, RegisterBody, RegisterSuccessResponse } from './types/auth.types';

const resolveWithDelay = <T>(data: T, delay: number): Promise<T> => {
  return new Promise<T>(resolve => setTimeout(() => resolve(data), delay));
};

export const mockApiClient: ApisauceInstance = {
  get: ((url: string, params?: unknown) => {
    // Determine handler by URL
    switch (true) {
      // GET paginated artworks: sequential items based on page & pageSize
      case url === '/api/Artworks': {
        const { page = 1, pageSize = 10 } = (params as PaginationBody) || {};
        const totalCount = 150;
        const startId = (page - 1) * pageSize + 1;
        const available = Math.max(0, totalCount - (startId - 1));
        const count = Math.min(pageSize, available);
        const items: Artwork[] = Array.from({ length: count }, (_, i) => ({
          objectID: startId + i,
          title: `Artwork ${startId + i}`,
          author: 'Unknown',
          year: 'Unknown',
          style: 'Unknown',
          description: 'No description',
          imageUrl: `https://picsum.photos/seed/artwork-${startId + i}/300/200`,
        }));
        const body = { results: items, totalCount };
        console.log('[MOCK GET] Artworks:', body);
        const response: ApiResponse<typeof body, DefaultApiErrorResponse> = {
          ok: true,
          status: 200,
          data: body,
          problem: null,
          originalError: null,
          headers: {},
          config: {},
          duration: 0,
        };
        return resolveWithDelay(response, 300);
      }

      // GET single artwork by ID
      case /^\/api\/Artworks\/\d+$/.test(url): {
        const match = url.match(/\d+$/);
        const id = match ? Number(match[0]) : 0;
        const artwork: Artwork = {
          objectID: id,
          title: `Artwork ${id}`,
          author: 'Unknown',
          year: 'Unknown',
          style: 'Unknown',
          description: 'No description',
          // Placeholder image
          imageUrl: `https://picsum.photos/seed/artwork-${id}/300/200`,
        };
        const response: ApiResponse<Artwork, DefaultApiErrorResponse> = {
          ok: true,
          status: 200,
          data: artwork,
          problem: null,
          originalError: null,
          headers: {},
          config: {},
          duration: 0,
        };
        return resolveWithDelay(response, 300);
      }

      default: {
        const errorResponse: ApiResponse<unknown, DefaultApiErrorResponse> = {
          ok: false,
          status: 404,
          data: { message: 'Not implemented' },
          problem: 'CLIENT_ERROR',
          originalError: new AxiosError(),
          headers: {},
          config: {},
          duration: 0,
        };
        return resolveWithDelay(errorResponse, 500);
      }
    }
  }) as ApisauceInstance['get'],

  post: ((url: string, body?: unknown) => {
    switch (url) {
      case '/api/Account/login':
      case '/api/Account/register': {
        const username = (body as LoginBody | RegisterBody).username;
        const data: LoginSuccessResponse | RegisterSuccessResponse = { id: '1', username };
        const response: ApiResponse<typeof data, DefaultApiErrorResponse> = {
          ok: true,
          status: 200,
          data,
          problem: null,
          originalError: null,
          headers: {},
          config: {},
          duration: 0,
        };
        return resolveWithDelay(response, 2000);
      }
      case '/api/Account/logout': {
        const response: ApiResponse<undefined, DefaultApiErrorResponse> = {
          ok: true,
          status: 200,
          data: undefined,
          problem: null,
          originalError: null,
          headers: {},
          config: {},
          duration: 0,
        };
        return resolveWithDelay(response, 1000);
      }
      default: {
        const errorResponse: ApiResponse<unknown, DefaultApiErrorResponse> = {
          ok: false,
          status: 404,
          data: { message: 'Not implemented' },
          problem: 'CLIENT_ERROR',
          originalError: new AxiosError(),
          headers: {},
          config: {},
          duration: 0,
        };
        return resolveWithDelay(errorResponse, 500);
      }
    }
  }) as ApisauceInstance['post'],

  put: (() => {
    switch (true) {
      default: {
        const errorResponse: ApiResponse<unknown, DefaultApiErrorResponse> = {
          ok: false,
          status: 404,
          data: { message: 'Not implemented' },
          problem: 'CLIENT_ERROR',
          originalError: new AxiosError(),
          headers: {},
          config: {},
          duration: 0,
        };
        return resolveWithDelay(errorResponse, 500);
      }
    }
  }) as ApisauceInstance['put'],
  delete: ((url: string) => {
    switch (url) {
      default: {
        const errorResponse: ApiResponse<unknown, DefaultApiErrorResponse> = {
          ok: false,
          status: 404,
          data: { message: 'Not implemented' },
          problem: 'CLIENT_ERROR',
          originalError: new AxiosError(),
          headers: {},
          config: {},
          duration: 0,
        };
        return resolveWithDelay(errorResponse, 500);
      }
    }
  }) as ApisauceInstance['delete'],
} as ApisauceInstance;
