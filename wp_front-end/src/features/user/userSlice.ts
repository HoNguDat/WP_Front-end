import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../models/user/user";
import { getAllUserService } from "../../services/user";
interface UserState {
  users: User[];
  user: User | null;
  loading: boolean;
  error: string;
}

const initialState: UserState = {
  users: [],
  user: null,
  loading: false,
  error: "",
};
export const fetchUsers = createAsyncThunk("user/fetchUsers", () => {
  return getAllUserService();
});
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoggedInUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchUsers.fulfilled,
      (state, action: PayloadAction<User[]>) => {
        state.loading = false;
        state.users = action.payload;
        state.error = "";
      }
    );
  },
});
export const { setLoggedInUser } = userSlice.actions;
export default userSlice.reducer;
