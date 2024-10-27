import { createAction, createReducer } from "@reduxjs/toolkit";
import { Auth } from "../types";

const initialState: Auth = {
  uid: null,
  email: null,
  signedIn: null,
};

export const authReducer = createReducer(initialState, (builder) => {
  builder.addCase(createAction<Auth>("auth/change"), (state, action) => {
    const { uid, email, signedIn } = action.payload;
    state.email = email;
    state.uid = uid;
    state.signedIn = signedIn;
  });
});
