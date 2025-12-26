
import { LoginRequest, LoginResponse, SignupRequest, SignupResponse, AuthError } from '@/types/auth';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

export class AuthService {
  /**
   * Login user (admin or client)
   */
  static async login(credentials: LoginRequest): Promise<LoginResponse | AuthError> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: data.message || 'Login failed',
          errors: data.errors,
        };
      }

      return data;
    } catch (error) {
      return {
        success: false,
        message: 'Network error. Please try again.',
      };
    }
  }

  /**
   * Signup new client
   */
  static async signup(userData: SignupRequest): Promise<SignupResponse | AuthError> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: data.message || 'Signup failed',
          errors: data.errors,
        };
      }

      return data;
    } catch (error) {
      return {
        success: false,
        message: 'Network error. Please try again.',
      };
    }
  }
}