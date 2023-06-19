import { createSlice } from "@reduxjs/toolkit";

export const noteSlice = createSlice({
  name: "note",
  initialState: {
    value: "",
  },
  reducers: {
    search: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { search } = noteSlice.actions;
export default noteSlice.reducer;
