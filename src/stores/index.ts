import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { combineReducers } from "redux";
import bookReducer from "./reducers/bookReducer";
import userReducer from "./reducers/userReducer";
import chapterReducer from "./reducers/chapterReducer";

const store = configureStore({
  reducer: combineReducers({
    chapterReducer,
    bookReducer,
    userReducer,
  }),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  devTools: true,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
