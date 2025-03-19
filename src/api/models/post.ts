export interface Post {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: Reaction;
  views: number;
  userId: number;
}

interface Reaction {
  likes: number;
  dislikes: number;
}
