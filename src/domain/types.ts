export type Uuid = string;
export type UserId = string;
export type Token = string;

export type User = {
  id: UserId;
  email: string;
  username: string;
  password: string;
};

export type UserWithPassword = User & { password: string };
