/** @format */

import type { User } from "@/types/user";
import type { Subscriber } from "@/types/subscriber";
import type { Retailer } from "@/types/retailer";
import type { AffiliateUser } from "@/types/affiliate";
import type { Order } from "@/types/order";

// Users Data
export const usersData: User[] = Array.from({ length: 20 }, (_, i) => ({
  id: `user-${250 + i}`,
  name: `User ${i + 1}`,
  email: `user${i + 1}@gmail.com`,
  contact_number: `+26 152 ${1236 + i}`,
  role: i % 3 === 0 ? "owner" : i % 3 === 1 ? "staff" : "self_employed",
  staff_count: Math.floor(Math.random() * 10) + 1,
  created_at: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
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
  id: 100 + i,
  user_id: `user-${250 + i}`,
  name: `Retailer ${i + 1}`,
  email: `retailer${i + 1}@gmail.com`,
  contact_number: `+26 152 ${1236 + i}`,
  business_name: `Grace Beauty Supply ${i + 1}`,
  delivery_charge: `${5 + i}.00`,
  free_delivery_threshold: `${100 + i * 10}.00`,
  total_orders: Math.floor(Math.random() * 20) + 1,
  total_sales: `${1000 + i * 100}.00`,
  total_pending: `${100 + i * 10}.00`,
  total_cancelled: Math.floor(Math.random() * 5),
  api_key: `api-key-${i}`,
  is_approved: i % 3 !== 0, // Some approved, some not
  stripe_account_id: i % 2 === 0 ? `acct_${i}` : "N/A",
  stripe_connected: i % 2 === 0,
  stripe_connection_date:
    i % 2 === 0
      ? new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString()
      : null,
  created_at: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
}));

// Affiliate Users Data
export const affiliateUsersData: AffiliateUser[] = Array.from(
  { length: 20 },
  (_, i) => ({
    id: `affiliate-${250 + i}`,
    name: `Affiliate User ${i + 1}`,
    email: `affiliate${i + 1}@gmail.com`,
    referral_code: `REF${(250 + i).toString().padStart(4, "0")}`,
    total_referrals: 125 + i,
    total_earned: `${(256.45 + i * 10).toFixed(2)}`,
    withdrawn_amount: `${(256.45 + i * 5).toFixed(2)}`,
    pending_balance: `${(256.45 + i * 2).toFixed(2)}`,
  }),
);

// Orders Data
export const ordersData: Order[] = Array.from({ length: 20 }, (_, i) => ({
  order_id: 256 + i,
  user_name: `User ${i + 1}`,
  user_email: `user${i + 1}@gmail.com`,
  order_date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
  product_quantity: 4,
  total_amount: `${(34295 + i * 100).toFixed(2)}`,
  platform_fee: `${(1714.75 + i * 5).toFixed(2)}`,
  status: i % 3 === 0 ? "pending" : i % 3 === 1 ? "completed" : "failed",
}));
