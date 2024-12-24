// src/store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import repositoryReducer from "./repoSlice";
import authReducer from "./authSlice";
export const store = configureStore({
  reducer: {
    repository: repositoryReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
