/** @format */

export interface Retailer {
  id: number;
  user_id: string;
  name: string;
  email: string;
  contact_number: string;
  business_name: string;
  delivery_charge: string;
  free_delivery_threshold: string;
  total_orders: number;
  total_sales: string;
  total_pending: string;
  total_cancelled: number;
  api_key: string;
  is_approved: boolean;
  stripe_account_id: string;
  stripe_connected: boolean;
  stripe_connection_date: string | null;
  created_at: string;
}

export type RetailerStatus = "all" | "approved" | "pending";

export interface RetailersApiResponse {
  success: boolean;
  message: string;
  data: {
    retailers: Retailer[];
    total_count: number;
  };
}
