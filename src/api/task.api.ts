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

    createTask: builder.mutation<
      any,
      {
        title: string;
        description: string;
        start_date: string;
        end_date: string;
        start_time: string;
        end_time: string;
      }
    >({
      query: (payload) => {
        return {
          url: `task/create/`,
          method: "POST",
          body: payload,
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
        };
      },
      invalidatesTags:["task"]
    }),

    getTask: builder.query<any, {id:string}>({
      query: ({id}) => ({
        url: `/tasks/${id}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      }),
    }),
  }),
});

export const { useGetTasksQuery, useCreateTaskMutation, useGetTaskQuery } = taskApi;