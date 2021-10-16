import {
  RegistrationRequest,
  RegistrationSucess,
  LoginRequest,
  UserToken,
  LoginResponse,
  Headers,
  Params,
  ErrorResponse,
  CreateNoteRequest,
} from "./contracts";
import { v4 } from "uuid";
import {
  UserWithPassword,
  NoteWithUser,
  Token,
  UserId,
  Note,
} from "./../domain/types";
// import Joi from "joi";
import * as R from "ramda";
import {
  CreateNoteResponse,
  CheckTokenRequest,
  GetUserNotesRequest,
} from "./contracts";

// Simulating database tables in localStorage
// This is not an accurate representation of how secure authentication is supposed to work

export const registerUser = ({
  username,
  email,
  password,
}: RegistrationRequest): Promise<RegistrationSucess> => {
  const id = v4();

  const user: UserWithPassword = {
    id,
    username,
    email,
    password,
  };

  if (!localStorage.getItem("users")) {
    const users: Array<UserWithPassword> = [];
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    return Promise.resolve({ id });
  }

  const users: Array<UserWithPassword> = JSON.parse(
    localStorage.getItem("users") as string
  );

  const duplicatedDetails = (obj: UserWithPassword) =>
    R.eqProps("username", user, obj) || R.eqProps("email", user, obj);

  if (R.find(duplicatedDetails, users)) {
    return Promise.reject({
      code: "conflict",
      status: 409,
      detail: "Duplicated details",
      meta: {
        correlationToken: v4(),
        serviceId: "Registration",
      },
    });
  }

  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));

  if (!localStorage.getItem("notes")) {
    localStorage.setItem("notes", JSON.stringify([]));
  }

  return Promise.resolve({ id });
};

export const loginUser = ({
  username,
  password,
}: LoginRequest): Promise<LoginResponse> => {
  if (!localStorage.getItem("users")) {
    return Promise.reject({
      code: "server-error",
      status: 500,
      detail: "Server error: no users table",
      meta: {
        correlationToken: v4(),
        serviceId: "Authentication",
      },
    });
  }

  const users: Array<UserWithPassword> = JSON.parse(
    localStorage.getItem("users") as string
  );

  const loggedInUser = R.find(
    (user: UserWithPassword) =>
      user.username === username && user.password === password,
    users
  );
  if (loggedInUser) {
    const token = v4();
    // 24h expiration
    const tokenExpiration = new Date(
      new Date().getTime() + 24 * 60 * 60 * 1000
    ).toISOString();
    const userToken = {
      token,
      tokenExpiration,
    };

    if (!localStorage.getItem("tokens")) {
      const userTokens: UserToken = {
        [loggedInUser.id]: userToken,
      };
      localStorage.setItem("tokens", JSON.stringify(userTokens));
    } else {
      const userTokens: UserToken = JSON.parse(
        localStorage.getItem("tokens") as string
      );
      userTokens[loggedInUser.id] = userToken;
      localStorage.setItem("tokens", JSON.stringify(userTokens));
    }

    return Promise.resolve({
      token,
      username,
      id: loggedInUser.id,
    });
  }

  return Promise.reject({
    code: "unauthorized",
    status: 401,
    detail: "Incorrect details",
    meta: {
      correlationToken: v4(),
      serviceId: "Authentication",
    },
  });
};

const checkAuthorization = (
  userId: UserId,
  token: Token
): ErrorResponse | null => {
  if (!localStorage.getItem("tokens")) {
    return {
      code: "server-error",
      status: 500,
      detail: "Server error: no tokens table",
      meta: {
        correlationToken: v4(),
        serviceId: "Authentication",
      },
    };
  }

  const tokens: UserToken = JSON.parse(
    localStorage.getItem("tokens") as string
  );

  const tokenObject = tokens[userId];

  if (!tokenObject) {
    return {
      code: "unauthorized",
      status: 401,
      detail: "Token not found",
      meta: {
        correlationToken: v4(),
        serviceId: "Authentication",
      },
    };
  }

  const { token: dbToken, tokenExpiration } = tokenObject;
  const now = new Date();
  const tokenExpirationDate = new Date(tokenExpiration);

  if (dbToken !== token || now > tokenExpirationDate) {
    return {
      code: "unauthorized",
      status: 401,
      detail: "Token invalid",
      meta: {
        correlationToken: v4(),
        serviceId: "Authentication",
      },
    };
  }

  return null;
};

export const getUserNotes = ({ userId, token }: GetUserNotesRequest) => {
  const error = checkAuthorization(userId, token);
  if (error) {
    return Promise.reject(error);
  }

  if (!localStorage.getItem("notes")) {
    return Promise.reject({
      code: "not-found",
      status: 404,
      detail: "No notes found",
      meta: {
        correlationToken: v4(),
        serviceId: "Notes",
      },
    });
  }

  const notes: Array<NoteWithUser> = JSON.parse(
    localStorage.getItem("notes") as string
  );
  const userNotes = R.filter((note) => note.userId === userId, notes);
  return Promise.resolve(userNotes);
};

export const createUserNote = (
  request: CreateNoteRequest
): Promise<CreateNoteResponse> => {
  const error = checkAuthorization(request.userId, request.token);
  if (error) {
    return Promise.reject(error);
  }

  const noteId = v4();
  const notes: Array<NoteWithUser> = [];
  const note = {
    title: request.title,
    id: noteId,
    userId: request.userId,
    dateTime: request.dateTime || new Date().toISOString(),
  };

  notes.push(note);

  if (!localStorage.getItem("notes")) {
    localStorage.setItem("notes", JSON.stringify(notes));
  } else {
    const dbNotes: Array<NoteWithUser> = JSON.parse(
      localStorage.getItem("notes") as string
    );
    localStorage.setItem("notes", JSON.stringify([...dbNotes, ...notes]));
  }

  return Promise.resolve({
    id: noteId,
  });
};

export const checkTokenIsValid = ({
  userId,
  token,
}: CheckTokenRequest): Promise<boolean> => {
  if (!checkAuthorization(userId, token)) {
    return Promise.resolve(true);
  }

  return Promise.reject(false);
};
