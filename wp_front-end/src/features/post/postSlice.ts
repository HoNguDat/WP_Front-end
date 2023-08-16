import axios from "axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AddPost, Post } from "../../models/post/post";

import {
  savePostService,
  deletePostService,
  getAllPostService,
} from "../../services/post";
type InitialState = {
  loading: boolean;
  posts: Post[];
  error: string;
};
const initialState: InitialState = {
  loading: false,
  posts: [],
  error: "",
};

export const fetchPosts = createAsyncThunk("post/fetchPosts", () => {
  return getAllPostService();
});
export const addPost = createAsyncThunk("post/addPost", (post: AddPost) => {
  return savePostService(post);
});
// export const addPost = createAsyncThunk(
//   "post/addPost",
//   async (post: AddPost) => {
//     const result = await axios.post(
//       "https://localhost:44332/api/Post/addPost",
//       post,
//       {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       }
//     );
//     return (await result).data;
//   }
// );
export const deletePost = createAsyncThunk(
  "post/deletePost",
  async (id: number) => {
    if (window.confirm("Are you sure ?")) {
      await deletePostService(id);
    }
    return id;
  }
);
const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchPosts.fulfilled,
      (state, action: PayloadAction<Post[]>) => {
        state.loading = false;
        state.posts = action.payload;
        state.error = "";
      }
    );
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.loading = false;
      state.posts = [];
      state.error = action.error.message || "Something went wrong";
    });
    builder.addCase(addPost.fulfilled, (state, action: PayloadAction<Post>) => {
      state.posts.unshift(action.payload);
      state.error = "";
    });

    builder.addCase(addPost.rejected, (state, action) => {
      state.error = action.error.message || "Something went wrong";
    });
    builder.addCase(
      deletePost.fulfilled,
      (state, action: PayloadAction<number>) => {
        state.posts = state.posts.filter(
          (post) => post.postId !== action.payload
        );
        state.error = "";
      }
    );

    builder.addCase(deletePost.rejected, (state, action) => {
      state.error = action.error.message || "Something went wrong";
    });
  },
});

export default postSlice.reducer;
