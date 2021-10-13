import { Uuid, UserId, Token } from "./../domain/types";

export type HttpStatus = 400 | 401 | 404 | 409 | 500;
export type ServiceId = "Registration" | "Authentication" | "NoteService";
export type DateString = string;

export type RegistrationRequest = {
  username: string;
  password: string;
  email: string;
};

export type RegistrationSucess = {
  id: UserId;
  // token: Token;
};

export type ErrorMeta = {
  correlationToken: Uuid;
  serviceId: ServiceId;
};

export type ErrorResponse = {
  code: string;
  status: HttpStatus;
  detail: string;
  meta: ErrorMeta;
};

export type LoginRequest = {
  username: string;
  password: string;
};

export type LoginResponse = {
  token: Token;
  username: string;
  id: UserId;
};

export type UserToken = {
  [key: string]: {
    token: Token;
    tokenExpiration: DateString;
  };
};

export type Headers = {
  Authorization: Token;
};

export type Params = {
  id: UserId;
};

export type CreateNoteRequest = {
  title: string;
  description?: string;
  label?: string;
  dateTime?: string;
};

export type CreateNoteResponse = {
  id: Uuid;
};

export type CheckTokenRequest = {
  userId: UserId;
  token: Token;
};
