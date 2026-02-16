/** @format */

"use client";

import React from "react";
import CustomTable from "@/components/CommonComponents/CustomTable";
import { subscribersData } from "@/data/AllData";
import { Subscriber } from "@/types/subscriber";

const SubscribersPage = () => {
  const subscriberColumns = [
    { header: "User Id", accessor: "userId" as keyof Subscriber },
    { header: "Email", accessor: "email" as keyof Subscriber },
    { header: "Contact Number", accessor: "contactNumber" as keyof Subscriber },
    { header: "Location", accessor: "location" as keyof Subscriber },
    { header: "Plan", accessor: "plan" as keyof Subscriber },
  ];

  const handleAction = (subscriber: Subscriber) => {
    console.log("View subscriber:", subscriber);
    // Add your action logic here
  };

  return (
    <div className="min-h-screen  p-4 sm:p-6 lg:p-8">
      <div className="max-w-625 mx-auto">
        <div className="bg-white  rounded-xl p-4 sm:p-6 shadow-sm">
          <CustomTable
            data={subscribersData}
            columns={subscriberColumns}
            title="Subscriber Lists"
            itemsPerPage={10}
            onAction={handleAction}
          />
        </div>
      </div>
    </div>
  );
};

export default SubscribersPage;
