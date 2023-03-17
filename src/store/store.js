import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../features/todo/TodoSlice";

export default store = configureStore({
  reducer: {
    todos: todoReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});
