import { UserId, Token } from "../domain/types";

type StoredToken = {
  userId: UserId;
  token: Token;
};

export const storeToken = (userId: UserId, token: Token): void => {
  localStorage.setItem(
    "token",
    JSON.stringify({
      userId,
      token,
    })
  );
};

export const getStoredToken = (): StoredToken | null => {
  const token = localStorage.getItem("token");

  if (!token) {
    return null;
  }

  return JSON.parse(token) as StoredToken;
};
