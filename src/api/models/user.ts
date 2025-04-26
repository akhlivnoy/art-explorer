import { Nullable } from '@/types/nullable';

export type User = {
  id: string;
  // id: number;
  username: Nullable<string>;
};
