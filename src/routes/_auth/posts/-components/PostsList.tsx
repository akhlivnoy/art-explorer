import { Link } from '@tanstack/react-router';

import { Post } from '@/api/models/post';

type PostsListProps = {
  posts: Post[];
  page?: number;
};

export const PostsList: React.ComponentType<PostsListProps> = ({ posts, page }) => {
  return (
    <ul className="list-disc">
      {[...posts, { id: '-1', title: 'Non-existent Post' }, { id: 'error', title: 'Error Post' }].map(post => (
        <li className="whitespace-nowrap" key={post.id}>
          <Link
            activeProps={{ className: 'font-bold underline' }}
            className="block w-full overflow-x-hidden py-1 text-ellipsis text-blue-600 hover:opacity-75"
            params={{ postId: String(post.id) }}
            search={{ page }}
            to="/posts/$postId"
          >
            {post.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};
