import { ApiError, NotFoundError } from '@/api/types/api.types';

export function getErrorMessage(error: unknown): string | undefined {
  if (error instanceof ApiError || error instanceof NotFoundError) {
    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return undefined;
}
