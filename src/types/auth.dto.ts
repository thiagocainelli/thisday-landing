import { UserTypeEnum } from "./enums";
import { ReadUserDto } from "./users.dto";

export interface AuthLoginDto {
  email: string;
  password: string;
}

export interface AuthRegisterDto {
  name: string;
  email: string;
  password: string;
  type: UserTypeEnum;
  profileImageUrl?: string;
}

export interface AuthForgotPasswordDto {
  email: string;
}

export interface AuthResetPasswordDto {
  password: string;
  token: string;
}

export interface RefreshTokenAuthDto {
  refreshToken: string;
}

export interface ReadAuthDto {
  accessToken: string;
  refreshToken: string;
  userData: ReadUserDto;
}

export interface ReadRefreshTokenAuthDto {
  accessToken: string;
  refreshToken: string;
}

export interface ReadAuthTokenDto {
  accessToken: string;
}

export type RegisterAuthDto = ReadUserDto;

export interface SuccessAuthDto {
  success: boolean;
}
