import { keepPreviousData } from '@tanstack/react-query';

import { PostsApi } from '../endpoints/posts.api';
import { createQueryOptions } from '../utils';

export const postsQueryOptions = createQueryOptions('posts', PostsApi.getPosts, {
  placeholderData: keepPreviousData,
});

export const postQueryOptions = createQueryOptions('post', PostsApi.getPost);
