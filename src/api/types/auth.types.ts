// import { User } from '../models/user';

// Login
export type LoginBody = {
  username: string;
  password: string;
};
export type LoginSuccessResponse = {
  id: string;
  username: string;
  // user: User;
};

// Register
export type RegisterBody = {
  email: string;
  username: string;
  password: string;
};
export type RegisterSuccessResponse = {
  id: string;
  username: string;
};
