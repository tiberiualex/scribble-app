import {
  RegistrationRequest,
  RegistrationSucess,
  LoginRequest,
  UserToken,
} from "./contracts";
import { v4 } from "uuid";
import { UserWithPassword } from "./../domain/types";
// import Joi from "joi";
import * as R from "ramda";
import { LoginResponse } from "./contracts";
import { Token } from "../domain/types";

// Simulating database tables in localStorage

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
      token: v4(),
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
