/** @format */

export interface User {
  id: string;
  name: string;
  email: string;
  contact_number: string;
  role: string | null;
  staff_count: number;
  created_at: string;
}

export interface UsersApiResponse {
  success: boolean;
  message: string;
  data: {
    users: User[];
    total_count: number;
  };
}
