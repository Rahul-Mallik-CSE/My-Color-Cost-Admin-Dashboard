/** @format */

"use client";

import React from "react";
import CustomTable from "@/components/CommonComponents/CustomTable";
import { Order } from "@/types/order";
import { useGetOrdersQuery } from "@/redux/feature/dashboardAPI";

const OrdersPage = () => {
  const { data: ordersResponse, isLoading } = useGetOrdersQuery();

  const orders = ordersResponse?.data?.orders ?? [];

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
    {
      header: "Platform Fee",
      accessor: (row: Order) => `$${row.platform_fee}`,
    },
    { header: "Status", accessor: "status" as keyof Order },
  ];

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-625 mx-auto">
        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm">
          {isLoading ? (
            <div className="text-center py-10 text-gray-500">
              Loading orders...
            </div>
          ) : (
            <CustomTable
              data={orders}
              columns={orderColumns}
              title="Order Lists"
              itemsPerPage={12}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
