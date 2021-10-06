import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  EntityAdapter,
} from "@reduxjs/toolkit";
import * as client from "../../api/mockApi";
import { RegistrationRequest } from "../../api/contracts";
import { User } from "../../domain/types";

type UserState = Partial<User>;

const initialState: UserState = {};

export const registerUser = createAsyncThunk(
  "user/login",
  async (userDetails: RegistrationRequest, { rejectWithValue }) => {
    try {
      const result = await client.registerUser(userDetails);
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
    });
  },
});

export default userSlice.reducer;
