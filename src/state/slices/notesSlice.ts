import {
  createSlice,
  createAsyncThink,
  createEntityAdapter,
  EntityAdapter,
  Reducer,
} from "@reduxjs/toolkit";

const notesSlice = createSlice({
  name: "notes",
  initialState: {},
  reducers: {},
  extraReducers: {},
});

export default notesSlice.reducer;
