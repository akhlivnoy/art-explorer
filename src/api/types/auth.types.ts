import { User } from '../models/user';

// Login
export type LoginBody = {
  username: string;
  password: string;
};
export type LoginSuccessResponse = {
  user: User;
};

// Register
export type RegisterBody = {
  username: string;
  password: string;
};
export type RegisterSuccessResponse = {
  user: User;
};
