import {
  RegistrationRequest,
  RegistrationSucess,
  HttpStatus,
  ServiceId,
} from "./contracts";
import { v4 } from "uuid";
import { UserWithPassword } from "./../domain/types";
// import Joi from "joi";
import * as R from "ramda";

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
