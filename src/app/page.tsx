/** @format */

"use client";

import { StatsCard } from "@/components/CommonComponents/StatsCard";
import CustomTable from "@/components/CommonComponents/CustomTable";
import { Order } from "@/types/order";
import { DollarSign, UserCheck, Store } from "lucide-react";
import {
  useGetDashboardStatsQuery,
  useGetOrdersQuery,
} from "@/redux/feature/dashboardAPI";

export default function Home() {
  const { data: statsResponse } = useGetDashboardStatsQuery();
  const { data: ordersResponse, isLoading: ordersLoading } =
    useGetOrdersQuery();

  const stats = statsResponse?.data;

  const statsCards = [
    {
      title: "Total Revenue",
      value: stats
        ? `$${parseFloat(stats.total_revenue).toLocaleString()}`
        : "-",
      icon: DollarSign,
      iconColor: "#FF6B2C",
      iconBgColor: "#FFF4ED",
    },
    {
      title: "Total User",
      value: stats ? stats.total_users.toLocaleString() : "-",
      imageIcon: "/icons/users.svg",
      iconColor: "#00C853",
      iconBgColor: "#E8F5E9",
    },
    {
      title: "Total Subscriber",
      value: stats ? stats.total_subscribers.toLocaleString() : "-",
      icon: UserCheck,
      iconColor: "#FF6B2C",
      iconBgColor: "#FFF4ED",
    },
    {
      title: "Total Retailer",
      value: stats ? stats.total_retailers.toLocaleString() : "-",
      icon: Store,
      iconColor: "#FF6B2C",
      iconBgColor: "#FFF4ED",
    },
  ];

  const orderColumns = [
    { header: "Order ID", accessor: "order_id" as keyof Order },
    { header: "User Name", accessor: "user_name" as keyof Order },
    { header: "Email", accessor: "user_email" as keyof Order },
    {
      header: "Date",
      accessor: (row: Order) => new Date(row.order_date).toLocaleDateString(),
    },
    { header: "Product Qty", accessor: "product_quantity" as keyof Order },
    {
      header: "Amount",
      accessor: (row: Order) => `$${row.total_amount}`,
    },
    { header: "Status", accessor: "status" as keyof Order },
  ];

  const recentOrders = ordersResponse?.data?.orders?.slice(0, 8) ?? [];

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-625 mx-auto space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {statsCards.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>

        {/* Recent Orders Table */}
        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm">
          {ordersLoading ? (
            <div className="text-center py-10 text-gray-500">
              Loading orders...
            </div>
          ) : (
            <CustomTable
              data={recentOrders}
              columns={orderColumns}
              title="Recent Order"
              itemsPerPage={8}
            />
          )}
        </div>
      </div>
    </div>
  );
}
