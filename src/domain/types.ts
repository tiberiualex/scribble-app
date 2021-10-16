export type Uuid = string;
export type UserId = string;
export type Token = string;

export type User = {
  id: UserId;
  email: string;
  username: string;
};

export type UserWithPassword = User & { password: string };

export type Note = {
  title: string;
  id?: Uuid;
  description?: string;
  label?: string;
  dateTime: string;
};

export type NoteWithUser = Note & {
  userId: UserId;
};
