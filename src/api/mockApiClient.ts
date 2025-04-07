/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ApisauceInstance } from 'apisauce';
import { AxiosError } from 'axios';

const resolveWithDelay = <T>(data: T, delay: number) => {
  return new Promise(resolve => setTimeout(() => resolve(data), delay));
};

export const mockApiClient: ApisauceInstance = {
  get: (url => {
    switch (url) {
      default:
        return resolveWithDelay(
          {
            ok: false,
            problem: 'CLIENT_ERROR',
            originalError: new AxiosError(),
            data: { message: 'Not implemented' },
          },
          500,
        );
    }
  }) as ApisauceInstance['get'],
  post: ((url, params) => {
    switch (url) {
      case 'sign-in':
      case 'sign-up':
        return resolveWithDelay(
          {
            ok: true,
            data: {
              user: {
                id: 1,
                username: params.username,
              },
            },
            problem: null,
            originalError: null,
          },
          2_000,
        );
      case 'logout':
        return resolveWithDelay(
          {
            ok: true,
            data: undefined,
            problem: null,
            originalError: null,
          },
          1_000,
        );
      default:
        return resolveWithDelay(
          {
            ok: false,
            problem: 'CLIENT_ERROR',
            originalError: new AxiosError(),
            data: { message: 'Not implemented' },
          },
          500,
        );
    }
  }) as ApisauceInstance['post'],
} as ApisauceInstance;
