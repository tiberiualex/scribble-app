import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import notesReducer from "./slices/notesSlice";

const rootReducer = combineReducers({
  user: userReducer,
  notes: notesReducer,
});

export default rootReducer;
