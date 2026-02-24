/** @format */

import baseApi from "../api/baseAPI";
import type { OrdersApiResponse } from "@/types/order";

interface DashboardStats {
  total_revenue: string;
  total_users: number;
  total_subscribers: number;
  total_retailers: number;
}

interface DashboardStatsResponse {
  success: boolean;
  message: string;
  data: DashboardStats;
}

const dashboardAPI = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardStats: builder.query<DashboardStatsResponse, void>({
      query: () => "/admin-api/dashboard/stats/",
      providesTags: ["Dashboard"],
    }),
    getOrders: builder.query<OrdersApiResponse, void>({
      query: () => "/admin-api/orders/",
      providesTags: ["Order"],
    }),
  }),
});

export const { useGetDashboardStatsQuery, useGetOrdersQuery } = dashboardAPI;
