/** @format */

"use client";

import React from "react";
import CustomTable from "@/components/CommonComponents/CustomTable";
import { AffiliateUser } from "@/types/affiliate";
import { useGetAffiliateUsersQuery } from "@/redux/feature/affiliateUsersAPI";

const AffiliateUserPage = () => {
  const { data: affiliatesResponse, isLoading } = useGetAffiliateUsersQuery();

  const affiliates = affiliatesResponse?.data?.affiliates ?? [];

  const affiliateColumns = [
    {
      header: "User Id",
      accessor: (row: AffiliateUser) => row.id.slice(0, 8) + "...",
    },
    { header: "Name", accessor: "name" as keyof AffiliateUser },
    { header: "Email", accessor: "email" as keyof AffiliateUser },
    {
      header: "Referral Code",
      accessor: "referral_code" as keyof AffiliateUser,
    },
    {
      header: "Total Referrals",
      accessor: "total_referrals" as keyof AffiliateUser,
    },
    {
      header: "Total Earned",
      accessor: (row: AffiliateUser) => `$${row.total_earned}`,
    },
    {
      header: "Withdrawn",
      accessor: (row: AffiliateUser) => `$${row.withdrawn_amount}`,
    },
    {
      header: "Pending Balance",
      accessor: (row: AffiliateUser) => `$${row.pending_balance}`,
    },
  ];

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-625 mx-auto">
        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm">
          {isLoading ? (
            <div className="text-center py-10 text-gray-500">
              Loading affiliate users...
            </div>
          ) : (
            <CustomTable
              data={affiliates}
              columns={affiliateColumns}
              title="Affiliate User Lists"
              itemsPerPage={12}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AffiliateUserPage;
