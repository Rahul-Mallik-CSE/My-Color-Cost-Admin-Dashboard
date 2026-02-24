/** @format */

import baseApi from "../api/baseAPI";
import type { RetailersApiResponse, RetailerStatus } from "@/types/retailer";

interface ApproveRetailerRequest {
  id: number;
  is_approved: boolean;
}

interface ApproveRetailerResponse {
  success: boolean;
  message: string;
}

const retailersAPI = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRetailers: builder.query<RetailersApiResponse, RetailerStatus>({
      query: (status) => ({
        url: "/admin-api/retailers/",
        params: { status },
      }),
      providesTags: ["Retailer"],
    }),
    approveRetailer: builder.mutation<
      ApproveRetailerResponse,
      ApproveRetailerRequest
    >({
      query: ({ id, is_approved }) => ({
        url: `/admin-api/retailers/${id}/approval/`,
        method: "PATCH",
        body: { is_approved },
      }),
      invalidatesTags: ["Retailer"],
    }),
  }),
});

export const { useGetRetailersQuery, useApproveRetailerMutation } =
  retailersAPI;
