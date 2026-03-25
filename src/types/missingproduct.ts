/** @format */

export type MissingProductStatus = "all" | "pending" | "added" | "rejected";

export interface MissingProduct {
  id: number;
  requested_by_name: string;
  requested_by_email: string;
  product_name: string;
  category: string;
  brand: string;
  additional_notes: string;
  status: string;
  created_at: string;
}

export interface MissingProductsApiResponse {
  success: boolean;
  message: string;
  data: {
    products: MissingProduct[];
    total_count: number;
  };
}

export interface UpdateMissingProductStatusRequest {
  id: number;
  status: Exclude<MissingProductStatus, "all">;
}

export interface UpdateMissingProductStatusResponse {
  success: boolean;
  message: string;
}
