import { UserId, Token } from "../domain/types";

type StoredToken = {
  userId: UserId;
  token: Token;
  username: string;
};

// Don't store access tokens in localStorage in a real world app

export const storeToken = (
  userId: UserId,
  token: Token,
  username: string
): void => {
  localStorage.setItem(
    "token",
    JSON.stringify({
      userId,
      token,
      username,
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
