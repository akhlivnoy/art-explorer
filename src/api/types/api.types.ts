export type PaginationBody = {
  limit?: number;
  skip?: number;
};

export type ResponseWithPagination = {
  skip: number;
  total: number;
  limit: number;
};

export class NotFoundError extends Error {}

export class ApiError extends Error {}

export type ApiErrorResponse = {
  message: string;
};
