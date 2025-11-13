export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface ForgotPasswordData {
  email: string;
}

export interface VerifyCodeData {
  code: string;
}

export interface ResetPasswordData {
  password: string;
  confirmPassword: string;
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
}

export interface AuthState {
  user: AuthUser | null;
  isLoading: boolean;
  error: string | null;
  step: "login" | "forgot" | "verify" | "reset";
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}
