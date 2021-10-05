import { Uuid, UserId, Token } from "./../domain/types";

export type HttpStatus = 400 | 404 | 409 | 500;
export type ServiceId = "Registration" | "Authentication" | "NoteService";

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

export type RegistrationResponse = RegistrationSucess | ErrorResponse;
