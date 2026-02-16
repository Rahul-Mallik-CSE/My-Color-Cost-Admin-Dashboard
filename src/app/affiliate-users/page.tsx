/** @format */

"use client";

import React from "react";
import CustomTable from "@/components/CommonComponents/CustomTable";
import { affiliateUsersData } from "@/data/AllData";
import { AffiliateUser } from "@/types/affiliate";

const AffiliateUserPage = () => {
  const affiliateColumns = [
    { header: "User Id", accessor: "userId" as keyof AffiliateUser },
    { header: "Name", accessor: "name" as keyof AffiliateUser },
    { header: "Email", accessor: "email" as keyof AffiliateUser },
    { header: "Join User", accessor: "joinUser" as keyof AffiliateUser },
    { header: "Total Earn", accessor: "totalEarn" as keyof AffiliateUser },
    { header: "Withdraw", accessor: "withdraw" as keyof AffiliateUser },
    {
      header: "Pending Balance",
      accessor: "pendingBalance" as keyof AffiliateUser,
    },
  ];

  return (
    <div className="min-h-screen  p-4 sm:p-6 lg:p-8">
      <div className="max-w-625 mx-auto">
        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm">
          <CustomTable
            data={affiliateUsersData}
            columns={affiliateColumns}
            title="Affiliate User Lists"
            itemsPerPage={10}
          />
        </div>
      </div>
    </div>
  );
};

export default AffiliateUserPage;
