/** @format */

export interface AffiliateUser {
  id: string;
  name: string;
  email: string;
  referral_code: string;
  total_referrals: number;
  total_earned: string;
  withdrawn_amount: string;
  pending_balance: string;
}

export interface AffiliatesApiResponse {
  success: boolean;
  message: string;
  data: {
    affiliates: AffiliateUser[];
    total_count: number;
  };
}
