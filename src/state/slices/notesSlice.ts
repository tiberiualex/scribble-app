import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  EntityAdapter,
  Reducer,
} from "@reduxjs/toolkit";
import * as client from "../../api/mockApi";
import { CreateNoteRequest, Headers, Params } from "../../api/contracts";
import { Note, UserId, Token, NoteWithUser } from "../../domain/types";
import { RootState } from "state/store";

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

export const createUserNote = createAsyncThunk(
  "notes/create",
  async (
    {
      userId,
      token,
      title,
    }: {
      userId: UserId;
      token: Token;
      title: string;
    },
    thunkApi
  ) => {
    try {
      await client.createUserNote({ userId, token, title });
      console.log("creating note thunk");
      thunkApi.dispatch(getUserNotes({ userId, token }));
      // I guess we get the RootState type. Or is it just limited to the slice type?
      // Need to find a way to inject the auth
      // Is it even worth keeping the token in the state? Or just leave it to the API client to deal with this
      // thunkApi.getState(state => state.)
    } catch (err) {
      console.log(err);
      thunkApi.rejectWithValue(err);
    }
  }
);

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserNotes.fulfilled, (state, action) => {
      if (action.payload) {
        notesAdapter.upsertMany(state, action.payload);
      }
    });
  },
});

export default notesSlice.reducer as Reducer<typeof initialState>;

export const {
  selectById: selectNoteById,
  selectIds: selectNoteIds,
  selectEntities: selectNotesEntities,
  selectAll: selectAllNotes,
  selectTotal: selectTotalNotes,
} = notesAdapter.getSelectors((state: RootState) => state.notes);
