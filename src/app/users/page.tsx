/** @format */

"use client";

import React from "react";
import CustomTable from "@/components/CommonComponents/CustomTable";
import { usersData } from "@/data/AllData";
import { User } from "@/types/user";

const UsersPage = () => {
  const userColumns = [
    { header: "User Id", accessor: "userId" as keyof User },
    { header: "Name", accessor: "name" as keyof User },
    { header: "Email", accessor: "email" as keyof User },
    { header: "Contact Number", accessor: "contactNumber" as keyof User },
    { header: "Location", accessor: "location" as keyof User },
    { header: "Staff", accessor: "staff" as keyof User },
  ];

  const handleAction = (user: User) => {
    console.log("View user:", user);
    // Add your action logic here
  };

  return (
    <div className="min-h-screen  p-4 sm:p-6 lg:p-8">
      <div className="max-w-625 mx-auto">
        <div className="bg-white  rounded-xl p-4 sm:p-6 shadow-sm">
          <CustomTable
            data={usersData}
            columns={userColumns}
            title="User Lists"
            itemsPerPage={10}
            onAction={handleAction}
          />
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
