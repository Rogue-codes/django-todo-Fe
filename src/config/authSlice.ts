
/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { IUser } from "../interface/IUser.interface";

export interface IInitialState {
  isAuthenticated: boolean;
  user: IUser | null;
}

const token = Cookies.get("django-todo-token");
const user = localStorage.getItem("todoist-user");
const initialState: IInitialState = {
  isAuthenticated: token ? true : false,
  user: user ? JSON.parse(user!) : undefined,
};

export const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser: (
      state,
      action: PayloadAction<{
        user: IUser;
        access_token: string;
        refresh: string;
      }>
    ) => {
      console.log("payload");
      state.user = action.payload.user;
      state.isAuthenticated = !!action.payload.access_token;

      Cookies.set("django-todo-token", action.payload.access_token, { expires: 5 / (24 * 60) });
      Cookies.set("django-todo-refresh-token", action.payload.refresh, { expires: 5 });
      localStorage.setItem("todoist-user", JSON.stringify(state.user));
    },
  },
});

export const { loginUser } = userSlice.actions;

export default userSlice.reducer;
