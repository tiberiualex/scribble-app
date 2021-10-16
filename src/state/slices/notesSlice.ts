import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  EntityAdapter,
  Reducer,
} from "@reduxjs/toolkit";
import * as client from "../../api/mockApi";
import { CreateNoteRequest, Headers, Params } from "../../api/contracts";
import { Note, UserId, Token } from "../../domain/types";

const notesAdapter = createEntityAdapter<Note>();
const initialState = notesAdapter.getInitialState({
  loading: false,
});

export const getUserNotes = createAsyncThunk(
  "notes/getAll",
  async (
    { userId, token }: { userId: UserId; token: Token },
    { rejectWithValue }
  ) => {
    try {
      const result = client.getUserNotes({ userId, token });
      return result;
    } catch (err) {
      rejectWithValue(err);
    }
  }
);

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {},
  extraReducers: {},
});

export default notesSlice.reducer;
