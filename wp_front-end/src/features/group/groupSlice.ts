import axios from "axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Group } from "../../models/group/group";
import { getAllGroupService } from "../../services/group";
type InitialState = {
  loading: boolean;
  groups: Group[];
  error: string;
};
const initialState: InitialState = {
  loading: false,
  groups: [],
  error: "",
};

export const fetchGroups = createAsyncThunk("group/fetchGroups", () => {
  return getAllGroupService();
});

const groupSlice = createSlice({
  name: "group",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGroups.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchGroups.fulfilled,
      (state, action: PayloadAction<Group[]>) => {
        state.loading = false;
        state.groups = action.payload;
        state.error = "";
      }
    );
  },
});

export default groupSlice.reducer;
