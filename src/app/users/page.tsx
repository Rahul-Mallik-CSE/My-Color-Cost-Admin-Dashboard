/** @format */

"use client";

import React, { useState } from "react";
import CustomTable from "@/components/CommonComponents/CustomTable";
import { User } from "@/types/user";
import { useGetUsersQuery, UserRole } from "@/redux/feature/usersAPI";
import { cn } from "@/lib/utils";

const tabs: { label: string; role: UserRole }[] = [
  { label: "All", role: "" },
  { label: "Owner", role: "owner" },
  { label: "Staff", role: "staff" },
  { label: "Self Employed", role: "self_employed" },
];

const UsersPage = () => {
  const [activeRole, setActiveRole] = useState<UserRole>("");
  const { data: usersResponse, isLoading } = useGetUsersQuery(activeRole);

  const users = usersResponse?.data?.users ?? [];

  const userColumns = [
    { header: "User Id", accessor: (row: User) => row.id.slice(0, 8) + "..." },
    { header: "Name", accessor: "name" as keyof User },
    { header: "Email", accessor: "email" as keyof User },
    { header: "Contact Number", accessor: "contact_number" as keyof User },
    {
      header: "Role",
      accessor: (row: User) => row.role ?? "—",
    },
    { header: "Staff Count", accessor: "staff_count" as keyof User },
    {
      header: "Joined",
      accessor: (row: User) => new Date(row.created_at).toLocaleDateString(),
    },
  ];

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-625 mx-auto">
        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm">
          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-4 border-b pb-3">
            {tabs.map((tab) => (
              <button
                key={tab.role}
                onClick={() => setActiveRole(tab.role)}
                className={cn(
                  "px-4 py-1.5 rounded-full text-sm font-medium transition-colors",
                  activeRole === tab.role
                    ? "bg-pink-400 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200",
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {isLoading ? (
            <div className="text-center py-10 text-gray-500">
              Loading users...
            </div>
          ) : (
            <CustomTable
              data={users}
              columns={userColumns}
              title="User Lists"
              itemsPerPage={12}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
