import { configureStore } from "@reduxjs/toolkit";
import notesSlice from "../features/notesSlice";

export const store = configureStore({
  reducer: {
    note: notesSlice,
  },
});
