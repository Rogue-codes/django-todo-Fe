/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = import.meta.env.VITE_APP_API_URL + "";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    // prepareHeaders: (headers) => {
    //   const token = localStorage.getItem("@sterling_core_token");
    //   if (token) {
    //     headers.set("Authorization", `Bearer ${token}`);
    //   }
    //   return headers;
    // },
  }),
  tagTypes: ["auth"],
  endpoints: (builder) => ({
    login: builder.mutation<
      any,
      {
        username: string;
        password: string;
      }
    >({
      query: (payload) => {
        return {
          url: `login/`,
          method: "POST",
          body: payload,
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
        };
      },
    }),

    register: builder.mutation<
      any,
      {
        username: string;
        password: string;
      }
    >({
      query: (payload) => {
        return {
          url: `register/`,
          method: "POST",
          body: payload,
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
        };
      },
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;