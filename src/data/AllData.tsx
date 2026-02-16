/** @format */

import type { User } from "@/types/user";
import type { Subscriber } from "@/types/subscriber";
import type { Retailer } from "@/types/retailer";
import type { AffiliateUser } from "@/types/affiliate";
import type { Order } from "@/types/order";

// Users Data
export const usersData: User[] = Array.from({ length: 20 }, (_, i) => ({
  userId: `#CN ${250 + i}`,
  name: `User ${i + 1}`,
  email: `user${i + 1}@gmail.com`,
  contactNumber: `+26 152 ${1236 + i}`,
  location: `6096 Marjolaine L...`,
  staff: Math.floor(Math.random() * 10) + 1,
}));

// Subscribers Data
export const subscribersData: Subscriber[] = Array.from(
  { length: 20 },
  (_, i) => ({
    userId: `#CN ${250 + i}`,
    email: `name@gmail.com`,
    contactNumber: `+26 152 1236`,
    location: `6096 Marjolaine L...`,
    plan: i % 2 === 0 ? "VIP" : "Premium",
  }),
);

// Retailers Data
export const retailersData: Retailer[] = Array.from({ length: 20 }, (_, i) => ({
  user: `retailer${String(i + 1).padStart(2, "0")}@gmail.com`,
  businessName: `Grace Beauty Supply${i + 1}`,
  deliveryCharge: `${5 + i} $`,
  freeDeliveryThreshold: `${100 + i * 10} $`,
  totalOrders: Math.floor(Math.random() * 20) + 1,
  totalSales: `${(1000 + i * 100).toLocaleString()} $`,
  totalPending: `${(100 + i * 10).toLocaleString()} $`,
  totalCancelled: Math.floor(Math.random() * 5),
}));

// Affiliate Users Data
export const affiliateUsersData: AffiliateUser[] = Array.from(
  { length: 20 },
  (_, i) => ({
    userId: `#CN ${250 + i}`,
    name: `Rahim Hossain`,
    email: `name@gmail.com`,
    joinUser: 125 + i,
    totalEarn: `$${256.45 + i * 10}`,
    withdraw: `$${256.45 + i * 5}`,
    pendingBalance: `$${256.45 + i * 2}`,
  }),
);

// Orders Data
export const ordersData: Order[] = Array.from({ length: 20 }, (_, i) => ({
  orderId: `#CN ${256 + i}`,
  userName: `Rahim Hossain`,
  email: `name@gmail.com`,
  date: `12 jan, 2025`,
  productItem: 4,
  amount: `$34,295`,
}));
