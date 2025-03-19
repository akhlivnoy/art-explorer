import { Post } from '../models/post';
import { PaginationBody, ResponseWithPagination } from './api.types';

// Get posts
export type GetPostsBody = PaginationBody & {
  search?: string;
};
export type GetPostsResponse = ResponseWithPagination & {
  posts: Post[];
};

// Get post details
export type GetPostBody = {
  postId: number;
};
export type GetPostResponse = Post;
