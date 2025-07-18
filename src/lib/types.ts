export interface UserCreate {
  email: string;
  phoneNumber?: string;
  username?: string;
  password?: string;
  fullName?: string;
  role?: "user" | "admin"; // Default to 'user' if not provided
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}