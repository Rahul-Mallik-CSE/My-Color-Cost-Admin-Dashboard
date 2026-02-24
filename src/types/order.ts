/** @format */

export interface Order {
  order_id: number;
  user_name: string;
  user_email: string;
  order_date: string;
  product_quantity: number;
  total_amount: string;
  platform_fee: string;
  status: "pending" | "completed" | "failed";
}

export interface OrdersApiResponse {
  success: boolean;
  message: string;
  data: {
    orders: Order[];
    total_count: number;
    total_commission: number;
  };
}
