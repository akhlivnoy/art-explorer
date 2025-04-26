export type PaginationBody = {
  page?: number;
  pageSize?: number;
};

export type ResponseWithPagination = {
  page: number;
  total: number;
  pageSize: number;
};

export type Artwork = {
  objectID: number;
  title: string;
  author: string;
  year: string;
  style: string;
  description: string;
  imageUrl: string;
};

export class NotFoundError extends Error {}

export class ApiError extends Error {
  constructor(
    message?: string,
    public data?: APIErrorItem[],
  ) {
    super(message);
  }
}

export type ApiErrorResponse = {
  data?: APIErrorItem[];
  message?: string;
};

export type APIErrorItem = { description?: string };
