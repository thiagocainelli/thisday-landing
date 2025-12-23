import { apiPost, apiGet, apiPut } from "@/lib/api-utils";
import { API_CONFIG } from "@/config/api.config";
import { tokenManager } from "@/lib/api-client";
import {
  AuthLoginDto,
  AuthRegisterDto,
  AuthForgotPasswordDto,
  AuthResetPasswordDto,
  RefreshTokenAuthDto,
  ReadAuthDto,
  ReadRefreshTokenAuthDto,
  ReadAuthTokenDto,
  RegisterAuthDto,
  SuccessAuthDto,
} from "@/types/auth.dto";
import { ReadUserDto } from "@/types/users.dto";

const AUTH_ENDPOINT = API_CONFIG.endpoints.auth;

export const login = async (data: AuthLoginDto): Promise<ReadAuthDto> => {
  const response = await apiPost<ReadAuthDto, AuthLoginDto>(
    `${AUTH_ENDPOINT}/login`,
    data
  );

  tokenManager.setTokens(response.accessToken, response.refreshToken);

  return response;
};

export const register = async (
  data: AuthRegisterDto
): Promise<RegisterAuthDto> => {
  return await apiPost<RegisterAuthDto, AuthRegisterDto>(
    `${AUTH_ENDPOINT}/register`,
    data
  );
};

export const forgotPassword = async (
  data: AuthForgotPasswordDto
): Promise<SuccessAuthDto> => {
  return await apiPost<SuccessAuthDto, AuthForgotPasswordDto>(
    `${AUTH_ENDPOINT}/forgot-password`,
    data
  );
};

export const resetPassword = async (
  data: AuthResetPasswordDto
): Promise<SuccessAuthDto> => {
  return await apiPost<SuccessAuthDto, AuthResetPasswordDto>(
    `${AUTH_ENDPOINT}/reset-password`,
    data
  );
};

export const refreshToken = async (
  data: RefreshTokenAuthDto
): Promise<ReadRefreshTokenAuthDto> => {
  const response = await apiPut<ReadRefreshTokenAuthDto, RefreshTokenAuthDto>(
    `${AUTH_ENDPOINT}/refresh-token`,
    data
  );

  tokenManager.setTokens(response.accessToken, response.refreshToken);

  return response;
};

export const verifyToken = async (): Promise<ReadUserDto> => {
  return await apiGet<ReadUserDto>(`${AUTH_ENDPOINT}/verify-token`);
};

export const createNonExpiringToken = async (): Promise<ReadAuthTokenDto> => {
  return await apiPost<ReadAuthTokenDto>(`${AUTH_ENDPOINT}/non-expiring-token`);
};

export const logout = (): void => {
  tokenManager.clearTokens();
};
