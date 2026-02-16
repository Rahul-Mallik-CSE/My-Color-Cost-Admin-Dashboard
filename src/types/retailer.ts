/** @format */

export interface Retailer {
  user: string;
  businessName: string;
  deliveryCharge: string;
  freeDeliveryThreshold: string;
  totalOrders: number;
  totalSales: string;
  totalPending: string;
  totalCancelled: number;
  action?: string;
}
