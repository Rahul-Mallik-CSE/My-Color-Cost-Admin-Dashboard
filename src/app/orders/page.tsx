/** @format */

"use client";

import React from "react";
import CustomTable from "@/components/CommonComponents/CustomTable";
import { ordersData } from "@/data/AllData";
import { Order } from "@/types/order";

const OrdersPage = () => {
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
      <div className="max-w-625 mx-auto">
        <div className="bg-white  rounded-xl p-4 sm:p-6 shadow-sm">
          <CustomTable
            data={ordersData}
            columns={orderColumns}
            title="Order Lists"
            itemsPerPage={10}
          />
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
