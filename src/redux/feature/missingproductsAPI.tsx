/** @format */

import baseApi from "../api/baseAPI";
import type {
  MissingProductStatus,
  MissingProductsApiResponse,
  UpdateMissingProductStatusRequest,
  UpdateMissingProductStatusResponse,
} from "@/types/missingproduct";

const missingproductsAPI = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMissingProducts: builder.query<
      MissingProductsApiResponse,
      MissingProductStatus
    >({
      query: (status) => ({
        url: "/admin-api/missing-products/",
        params: { status },
      }),
      providesTags: ["MissingProduct"],
    }),
    updateMissingProductStatus: builder.mutation<
      UpdateMissingProductStatusResponse,
      UpdateMissingProductStatusRequest
    >({
      query: ({ id, status }) => ({
        url: `/admin-api/missing-products/${id}/`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["MissingProduct"],
    }),
  }),
});

export const {
  useGetMissingProductsQuery,
  useUpdateMissingProductStatusMutation,
} = missingproductsAPI;
