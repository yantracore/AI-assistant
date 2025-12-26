
// Auth Types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'client';
  status: string;
  avatar?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
  };
  token?: string;
}

export interface SignupRequest {
  name: string;
  email: string;
  password: string;
}

export interface SignupResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
  };
}

export interface AuthError {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
}