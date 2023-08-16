import { combineReducers, configureStore } from "@reduxjs/toolkit";
import groupReducer from "../features/group/groupSlice";
import postReducer from "../features/post/postSlice";
import userReducer from "../features/user/userSlice";
import commentReducer from "../features/comment/commentSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
const rootReducer = combineReducers({
  post: postReducer,
  user: userReducer,
  group: groupReducer,
  comment: commentReducer,
});
const persistConfig = { key: "root", storage };
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
});
export const persistor = persistStore(store);
//export default rootReducer;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export default store;
