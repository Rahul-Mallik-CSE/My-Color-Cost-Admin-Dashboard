/** @format */

"use client";

import React from "react";
import CustomTable from "@/components/CommonComponents/CustomTable";
import { retailersData } from "@/data/AllData";
import { Retailer } from "@/types/retailer";

const RetailersPage = () => {
  const retailerColumns = [
    { header: "User", accessor: "user" as keyof Retailer },
    { header: "Business Name", accessor: "businessName" as keyof Retailer },
    {
      header: "Delivery Charge",
      accessor: "deliveryCharge" as keyof Retailer,
    },
    {
      header: "Free Delivery Threshold",
      accessor: "freeDeliveryThreshold" as keyof Retailer,
    },
    { header: "Total Orders", accessor: "totalOrders" as keyof Retailer },
    { header: "Total Sales", accessor: "totalSales" as keyof Retailer },
    { header: "Total Pending", accessor: "totalPending" as keyof Retailer },
    {
      header: "Total Cancelled",
      accessor: "totalCancelled" as keyof Retailer,
    },
  ];

  const handleAction = (retailer: Retailer) => {
    console.log("View retailer:", retailer);
    // Add your action logic here
  };

  return (
    <div className="min-h-screen  p-4 sm:p-6 lg:p-8">
      <div className="max-w-625 mx-auto">
        <div className="bg-white  rounded-xl p-4 sm:p-6 shadow-sm">
          <CustomTable
            data={retailersData}
            columns={retailerColumns}
            title="Retailer Lists"
            itemsPerPage={10}
            onAction={handleAction}
          />
        </div>
      </div>
    </div>
  );
};

export default RetailersPage;
