/** @format */

import baseApi from "../api/baseAPI";

const authAPI = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<any, { email: string; password: string }>({
      query: (data) => ({
        url: `/auth/login/`,
        method: "POST",
        body: data,
      }),
    }),
    forgetPassword: builder.mutation<any, { email: string }>({
      query: (data) => ({
        url: `/auth/forgot-password/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),
    resendOtp: builder.mutation<any, { email: string }>({
      query: (data) => ({
        url: `/auth/resend-otp/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),
    verifyOtp: builder.mutation<any, { email: string; otp_code: string }>({
      query: (data) => ({
        url: `/auth/verify-otp/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),
    resetPassword: builder.mutation<any, { new_password: string }>({
      query: (data) => ({
        url: `/auth/reset-password/`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),
    updatePassword: builder.mutation({
      query: (data) => ({
        url: `/auth/change-password/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const {
  useLoginMutation,
  useForgetPasswordMutation,
  useResendOtpMutation,
  useVerifyOtpMutation,
  useResetPasswordMutation,
  useUpdatePasswordMutation,
} = authAPI;
