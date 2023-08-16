import axios from "axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Comment } from "../../models/comment/comment";
import {
  getAllCommentService,
  saveCommentService,
} from "../../services/comment";
type InitialState = {
  loading: boolean;
  comments: Comment[];
  error: string;
};
const initialState: InitialState = {
  loading: false,
  comments: [],
  error: "",
};

export const fetchComments = createAsyncThunk(
  "comment/fetchComments",
  (postId: number) => {
    return getAllCommentService(postId);
  }
);

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchComments.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchComments.fulfilled,
      (state, action: PayloadAction<Comment[]>) => {
        state.loading = false;
        state.comments = action.payload;
        state.error = "";
      }
    );
  },
});

export default commentSlice.reducer;
