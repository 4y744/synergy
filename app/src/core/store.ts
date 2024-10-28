import { configureStore, StateFromReducersMapObject } from "@reduxjs/toolkit";
import { authReducer } from "@/features/auth/reducers";

const reducer = {
  auth: authReducer,
};

export type RootState = StateFromReducersMapObject<typeof reducer>;

const preloadedState = localStorage.getItem("store")
  ? (JSON.parse(localStorage.getItem("store")!) as RootState)
  : {};

export const store = configureStore({
  reducer,
  preloadedState,
});

store.subscribe(() => {
  localStorage.setItem("store", JSON.stringify(store.getState()));
});
