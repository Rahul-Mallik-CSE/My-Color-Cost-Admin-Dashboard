/** @format */

import baseApi from "../api/baseAPI";
import type { AffiliatesApiResponse } from "@/types/affiliate";

const affiliateUsersAPI = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAffiliateUsers: builder.query<AffiliatesApiResponse, void>({
      query: () => "/admin-api/affiliates/",
      providesTags: ["Affiliate"],
    }),
  }),
});

export const { useGetAffiliateUsersQuery } = affiliateUsersAPI;
