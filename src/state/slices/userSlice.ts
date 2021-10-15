import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  EntityAdapter,
  Reducer,
} from "@reduxjs/toolkit";
import * as client from "../../api/mockApi";
import { RegistrationRequest, LoginRequest } from "../../api/contracts";
import { User, Token, UserId } from "../../domain/types";

type UserStatus = "LoggedOut" | "LoggedIn" | "Registered";

type UserState = Partial<User> & {
  status: UserStatus;
  token?: Token;
};

const initialState: UserState = {
  status: "LoggedOut",
};

export const registerUser = createAsyncThunk(
  "user/register",
  async (userDetails: RegistrationRequest, { rejectWithValue }) => {
    try {
      const result = await client.registerUser(userDetails);
      return result;
    } catch (err) {
      rejectWithValue(err);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/login",
  async (userDetails: LoginRequest, { rejectWithValue }) => {
    try {
      const result = await client.loginUser(userDetails);
      return result;
    } catch (err) {
      rejectWithValue(err);
    }
  }
);

export const checkToken = createAsyncThunk(
  "user/checkToken",
  async (
    { userId, token }: { userId: UserId; token: Token },
    { rejectWithValue }
  ) => {
    try {
      console.log("check token");
      const result = await client.checkTokenIsValid({ userId, token });
      if (result) {
        return {
          userId: userId,
          token: token,
          loggedIn: true,
        };
      }
    } catch (err) {
      rejectWithValue(err);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.id = action.payload?.id;
      state.status = "Registered";
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      const { payload } = action;
      state.id = payload?.id;
      state.status = "LoggedIn";
      state.username = payload?.username;
      state.token = payload?.token;
    });
    builder.addCase(checkToken.fulfilled, (state, action) => {
      const payload = action.payload;

      if (payload) {
        state.id = payload.userId;
        state.token = payload.token;
        state.status = "LoggedIn";
      }
    });
  },
});

export default userSlice.reducer as Reducer<typeof initialState>;
