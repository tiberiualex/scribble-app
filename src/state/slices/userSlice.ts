import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  EntityAdapter,
} from "@reduxjs/toolkit";
import * as client from "../../api/mockApi";
import { RegistrationRequest, LoginRequest } from "../../api/contracts";
import { User, Token } from "../../domain/types";

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
  },
});

export default userSlice.reducer;
