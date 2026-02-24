/** @format */

import baseApi from "../api/baseAPI";
import type { UsersApiResponse } from "@/types/user";

export type UserRole = "owner" | "staff" | "self_employed" | "";

const usersAPI = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<UsersApiResponse, UserRole>({
      query: (role) => ({
        url: "/admin-api/users/",
        params: role ? { role } : {},
      }),
      providesTags: ["User"],
    }),
  }),
});

export const { useGetUsersQuery } = usersAPI;
