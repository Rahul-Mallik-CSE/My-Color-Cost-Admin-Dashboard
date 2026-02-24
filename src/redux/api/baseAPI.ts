/** @format */

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";

const rawBaseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL || "/api/backend",
  prepareHeaders: (headers) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
    }
    return headers;
  },
});

// Wrapper that clears auth on 401
const baseQueryWithAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await rawBaseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    // Clear all auth data on unauthorized
    if (typeof window !== "undefined") {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      localStorage.removeItem("email");
      document.cookie =
        "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      window.location.href = "/signin";
    }
  }
  return result;
};

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithAuth,
  tagTypes: [
    "User",
    "Notification",
    "Profile",
    "Privacy",
    "AboutUs",
    "Settings",
    "Court",
    "Auth",
    "SkinCondition",
    "Product",
    "Dashboard",
    "Order",
    "Affiliate",
  ],
  endpoints: () => ({}),
});

export default baseApi;
