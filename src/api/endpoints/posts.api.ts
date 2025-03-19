import { apiClient } from '../apiClient';
import { ApiErrorResponse } from '../types/api.types';
import { GetPostBody, GetPostResponse, GetPostsBody, GetPostsResponse } from '../types/posts.types';
import { handleApiResponse } from '../utils';

export const PostsApi = {
  getPosts: async (body?: GetPostsBody) => {
    const response = await apiClient.get<GetPostsResponse, ApiErrorResponse>('posts', body);
    await new Promise(r => setTimeout(r, 2000));
    return handleApiResponse(response);
  },
  getPost: async ({ postId }: GetPostBody) => {
    const response = await apiClient.get<GetPostResponse, ApiErrorResponse>(`post/${postId}`);
    await new Promise(r => setTimeout(r, 1000));
    return handleApiResponse(response);
  },
};
