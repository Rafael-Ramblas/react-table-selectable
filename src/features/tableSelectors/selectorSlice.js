import { createSlice } from "@reduxjs/toolkit";
import shortid from "shortid";

export const selectorSlice = createSlice({
  name: "selector",
  initialState: {
    selectAll: null,
    deselectAll: null,
  },
  reducers: {
    selectAll: (state) => {
      state.selectAll = shortid.generate();
    },
    deselectAll: (state) => {
      state.deselectAll = shortid.generate();
    },
  },
});

export const { selectAll, deselectAll } = selectorSlice.actions;

export const selectAllValue = (state) => state.tableSelector.selectAll;
export const deselectAllValue = (state) => state.tableSelector.deselectAll;

export default selectorSlice.reducer;
