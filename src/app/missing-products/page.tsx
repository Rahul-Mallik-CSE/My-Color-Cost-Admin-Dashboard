/** @format */

"use client";

import React, { useMemo, useState } from "react";
import CustomTable from "@/components/CommonComponents/CustomTable";
import { cn } from "@/lib/utils";
import {
  useGetMissingProductsQuery,
  useUpdateMissingProductStatusMutation,
} from "@/redux/feature/missingproductsAPI";
import type {
  MissingProduct,
  MissingProductStatus,
} from "@/types/missingproduct";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const statusOptions: { label: string; value: MissingProductStatus }[] = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Added", value: "added" },
  { label: "Rejected", value: "rejected" },
];

const MissingProducts = () => {
  const [activeStatus, setActiveStatus] = useState<MissingProductStatus>("all");
  const [selectedProduct, setSelectedProduct] = useState<MissingProduct | null>(
    null,
  );
  const [newStatus, setNewStatus] =
    useState<Exclude<MissingProductStatus, "all">>("pending");

  const { data: response, isLoading } =
    useGetMissingProductsQuery(activeStatus);
  const [updateStatus, { isLoading: isUpdating }] =
    useUpdateMissingProductStatusMutation();

  const products = response?.data?.products ?? [];

  const columns = [
    {
      header: "Requester",
      accessor: "requested_by_name" as keyof MissingProduct,
    },
    {
      header: "Email",
      accessor: "requested_by_email" as keyof MissingProduct,
    },
    {
      header: "Product",
      accessor: "product_name" as keyof MissingProduct,
    },
    { header: "Category", accessor: "category" as keyof MissingProduct },
    { header: "Brand", accessor: "brand" as keyof MissingProduct },
    {
      header: "Date",
      accessor: (row: MissingProduct) =>
        new Date(row.created_at).toLocaleDateString(),
    },
    {
      header: "Status",
      accessor: (row: MissingProduct) => row.status,
    },
  ];

  const currentStatus = useMemo<Exclude<MissingProductStatus, "all">>(() => {
    if (!selectedProduct) return "pending";
    const normalized = selectedProduct.status.toLowerCase();
    if (normalized === "added" || normalized === "rejected") return normalized;
    return "pending";
  }, [selectedProduct]);

  const openDetails = (row: MissingProduct) => {
    setSelectedProduct(row);
    const normalized = row.status.toLowerCase();
    if (normalized === "added" || normalized === "rejected") {
      setNewStatus(normalized);
      return;
    }
    setNewStatus("pending");
  };

  const handleUpdateStatus = async () => {
    if (!selectedProduct) return;
    try {
      await updateStatus({
        id: selectedProduct.id,
        status: newStatus,
      }).unwrap();
      setSelectedProduct((prev) =>
        prev
          ? {
              ...prev,
              status: newStatus,
            }
          : null,
      );
    } catch (error) {
      console.error("Failed to update missing product status:", error);
    }
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-625 mx-auto">
        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800">
              Requested Missing Products
            </h2>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Status:</span>
              <select
                value={activeStatus}
                onChange={(e) =>
                  setActiveStatus(e.target.value as MissingProductStatus)
                }
                className="border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
              >
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {isLoading ? (
            <div className="text-center py-10 text-gray-500">
              Loading missing products...
            </div>
          ) : (
            <CustomTable
              data={products}
              columns={columns}
              title=""
              itemsPerPage={12}
              onAction={(row) => openDetails(row)}
            />
          )}
        </div>
      </div>

      <Dialog
        open={!!selectedProduct}
        onOpenChange={(open) => !open && setSelectedProduct(null)}
      >
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              Missing Product Request
            </DialogTitle>
          </DialogHeader>

          {selectedProduct && (
            <div className="space-y-3 text-sm text-gray-700">
              <DetailRow label="ID" value={String(selectedProduct.id)} />
              <DetailRow
                label="Requester"
                value={selectedProduct.requested_by_name}
              />
              <DetailRow
                label="Email"
                value={selectedProduct.requested_by_email}
              />
              <DetailRow label="Product" value={selectedProduct.product_name} />
              <DetailRow label="Category" value={selectedProduct.category} />
              <DetailRow label="Brand" value={selectedProduct.brand} />
              <DetailRow
                label="Created"
                value={new Date(selectedProduct.created_at).toLocaleString()}
              />
              <DetailRow
                label="Notes"
                value={selectedProduct.additional_notes || "-"}
              />

              <div className="space-y-2 pt-1">
                <label className="text-sm font-medium text-gray-600">
                  Update Status
                </label>
                <select
                  value={newStatus}
                  onChange={(e) =>
                    setNewStatus(
                      e.target.value as Exclude<MissingProductStatus, "all">,
                    )
                  }
                  className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
                >
                  <option value="pending">Pending</option>
                  <option value="added">Added</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-gray-100">
                <span className="font-medium text-gray-500 w-40">
                  Current Status
                </span>
                <span
                  className={cn(
                    "px-3 py-0.5 rounded-full text-xs font-semibold",
                    currentStatus === "added"
                      ? "bg-green-100 text-green-700"
                      : currentStatus === "rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700",
                  )}
                >
                  {selectedProduct.status}
                </span>
              </div>

              <button
                onClick={handleUpdateStatus}
                disabled={isUpdating || newStatus === currentStatus}
                className="w-full py-2 rounded-lg bg-pink-500 text-white font-medium hover:bg-pink-600 transition-colors disabled:opacity-60"
              >
                {isUpdating ? "Updating..." : "Update Status"}
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

const DetailRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-start justify-between py-1 border-b border-gray-100 gap-3">
    <span className="font-medium text-gray-500 w-40 shrink-0">{label}</span>
    <span className="text-gray-800 text-right wrap-break-word">{value}</span>
  </div>
);

export default MissingProducts;
