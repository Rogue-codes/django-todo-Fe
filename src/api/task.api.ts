/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

const BASE_URL = import.meta.env.VITE_APP_API_URL + "";

export const taskApi = createApi({
  reducerPath: "schoolApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const token = Cookies.get("django-todo-token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["task"],
  endpoints: (builder) => ({
    getTasks: builder.query<any, any>({
      query: () => ({
        url: `/tasks/all/`,
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      }),
      providesTags: ["task"],
    }),
  }),
});

export const { useGetTasksQuery } = taskApi;