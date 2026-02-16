/** @format */

"use client";

import { StatsCard } from "@/components/CommonComponents/StatsCard";
import CustomTable from "@/components/CommonComponents/CustomTable";
import { ordersData } from "@/data/AllData";
import { Order } from "@/types/order";
import { DollarSign, Users, UserCheck, Store } from "lucide-react";

export default function Home() {
  const statsData = [
    {
      title: "Total Revenue",
      value: "$89,000",
      icon: DollarSign,
      iconColor: "#FF6B2C",
      iconBgColor: "#FFF4ED",
    },
    {
      title: "Total User",
      value: "89,000",
      imageIcon: "/icons/users.svg",
      iconColor: "#00C853",
      iconBgColor: "#E8F5E9",
    },
    {
      title: "Total Subscriber",
      value: "2040",
      icon: DollarSign,
      iconColor: "#FF6B2C",
      iconBgColor: "#FFF4ED",
    },
    {
      title: "Total Retailer",
      value: "40,689",
      icon: DollarSign,
      iconColor: "#FF6B2C",
      iconBgColor: "#FFF4ED",
    },
  ];

  const orderColumns = [
    { header: "Order ID", accessor: "orderId" as keyof Order },
    { header: "User Name", accessor: "userName" as keyof Order },
    { header: "Email", accessor: "email" as keyof Order },
    { header: "Date", accessor: "date" as keyof Order },
    { header: "Product Item", accessor: "productItem" as keyof Order },
    { header: "Amount", accessor: "amount" as keyof Order },
  ];

  return (
    <div className="min-h-screen  p-4 sm:p-6 lg:p-8">
      <div className="max-w-625 mx-auto space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {statsData.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>

        {/* Recent Orders Table */}
        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm">
          <CustomTable
            data={ordersData.slice(0, 8)}
            columns={orderColumns}
            title="Recent Order"
            itemsPerPage={8}
          />
        </div>
      </div>
    </div>
  );
}
