/** @format */

"use client";

import React, { useState } from "react";
import CustomTable from "@/components/CommonComponents/CustomTable";
import { Retailer, RetailerStatus } from "@/types/retailer";
import {
  useGetRetailersQuery,
  useApproveRetailerMutation,
} from "@/redux/feature/retailersAPI";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const tabs: { label: string; status: RetailerStatus }[] = [
  { label: "All", status: "all" },
  { label: "Approved", status: "approved" },
  { label: "Pending", status: "pending" },
];

const RetailersPage = () => {
  const [activeStatus, setActiveStatus] = useState<RetailerStatus>("all");
  const [selectedRetailer, setSelectedRetailer] = useState<Retailer | null>(
    null,
  );

  const { data: retailersResponse, isLoading } =
    useGetRetailersQuery(activeStatus);
  const [approveRetailer, { isLoading: isApproving }] =
    useApproveRetailerMutation();

  const retailers = retailersResponse?.data?.retailers ?? [];

  const retailerColumns = [
    { header: "Name", accessor: "name" as keyof Retailer },
    { header: "Email", accessor: "email" as keyof Retailer },
    { header: "Business Name", accessor: "business_name" as keyof Retailer },
    {
      header: "Delivery Charge",
      accessor: (row: Retailer) => `$${row.delivery_charge}`,
    },
    { header: "Total Orders", accessor: "total_orders" as keyof Retailer },
    {
      header: "Total Sales",
      accessor: (row: Retailer) => `$${row.total_sales}`,
    },
    {
      header: "Status",
      accessor: (row: Retailer) => (row.is_approved ? "approved" : "pending"),
    },
  ];

  const handleApprove = async () => {
    if (!selectedRetailer) return;
    try {
      await approveRetailer({
        id: selectedRetailer.id,
        is_approved: true,
      }).unwrap();
      setSelectedRetailer((prev) =>
        prev ? { ...prev, is_approved: true } : null,
      );
    } catch (err) {
      console.error("Approval failed:", err);
    }
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-625 mx-auto">
        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm">
          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-4 border-b pb-3">
            {tabs.map((tab) => (
              <button
                key={tab.status}
                onClick={() => setActiveStatus(tab.status)}
                className={cn(
                  "px-4 py-1.5 rounded-full text-sm font-medium transition-colors",
                  activeStatus === tab.status
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
              Loading retailers...
            </div>
          ) : (
            <CustomTable
              data={retailers}
              columns={retailerColumns}
              title="Retailer Lists"
              itemsPerPage={12}
              onAction={(row) => setSelectedRetailer(row)}
            />
          )}
        </div>
      </div>

      {/* Detail Modal */}
      <Dialog
        open={!!selectedRetailer}
        onOpenChange={(open) => !open && setSelectedRetailer(null)}
      >
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              Retailer Details
            </DialogTitle>
          </DialogHeader>

          {selectedRetailer && (
            <div className="space-y-3 text-sm text-gray-700">
              <DetailRow label="ID" value={String(selectedRetailer.id)} />
              <DetailRow label="Name" value={selectedRetailer.name} />
              <DetailRow label="Email" value={selectedRetailer.email} />
              <DetailRow
                label="Contact"
                value={selectedRetailer.contact_number}
              />
              <DetailRow
                label="Business Name"
                value={selectedRetailer.business_name}
              />
              <DetailRow
                label="Delivery Charge"
                value={`$${selectedRetailer.delivery_charge}`}
              />
              <DetailRow
                label="Free Delivery Threshold"
                value={`$${selectedRetailer.free_delivery_threshold}`}
              />
              <DetailRow
                label="Total Orders"
                value={String(selectedRetailer.total_orders)}
              />
              <DetailRow
                label="Total Sales"
                value={`$${selectedRetailer.total_sales}`}
              />
              <DetailRow
                label="Total Pending"
                value={`$${selectedRetailer.total_pending}`}
              />
              <DetailRow
                label="Total Cancelled"
                value={String(selectedRetailer.total_cancelled)}
              />
              <DetailRow
                label="Stripe Connected"
                value={selectedRetailer.stripe_connected ? "Yes" : "No"}
              />
              <DetailRow
                label="Stripe Account"
                value={selectedRetailer.stripe_account_id}
              />
              {selectedRetailer.stripe_connection_date && (
                <DetailRow
                  label="Stripe Connected At"
                  value={new Date(
                    selectedRetailer.stripe_connection_date,
                  ).toLocaleDateString()}
                />
              )}
              <DetailRow
                label="Joined"
                value={new Date(
                  selectedRetailer.created_at,
                ).toLocaleDateString()}
              />
              <div className="flex items-center justify-between py-1 border-b border-gray-100">
                <span className="font-medium text-gray-500 w-40">Status</span>
                <span
                  className={cn(
                    "px-3 py-0.5 rounded-full text-xs font-semibold",
                    selectedRetailer.is_approved
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700",
                  )}
                >
                  {selectedRetailer.is_approved ? "Approved" : "Pending"}
                </span>
              </div>

              {/* Approve button — only shown if pending */}
              {!selectedRetailer.is_approved && (
                <div className="pt-2">
                  <button
                    onClick={handleApprove}
                    disabled={isApproving}
                    className="w-full py-2 rounded-lg bg-green-500 text-white font-medium hover:bg-green-600 transition-colors disabled:opacity-60"
                  >
                    {isApproving ? "Approving..." : "Approve Retailer"}
                  </button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

const DetailRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-start justify-between py-1 border-b border-gray-100">
    <span className="font-medium text-gray-500 w-40 shrink-0">{label}</span>
    <span className="text-gray-800 text-right break-all">{value}</span>
  </div>
);

export default RetailersPage;
