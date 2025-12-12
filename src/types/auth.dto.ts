export interface LoginDto {
  email: string;
  password: string;
}

export interface ForgotPasswordDto {
  email: string;
}

export interface ResetPasswordDto {
  token: string;
  password: string;
  confirmPassword: string;
}

export interface AuthResponseDto {
  user: {
    id: string;
    name: string;
    email: string;
    role: "admin" | "manager" | "support";
  };
  token: string;
}

