import axios, {
  AxiosInstance,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";
import Cookies from "js-cookie";
import { API_CONFIG } from "@/config/api.config";

const COOKIE_NAMES = {
  accessToken: "accessToken",
  refreshToken: "refreshToken",
} as const;

const COOKIE_OPTIONS = {
  expires: 30,
  path: "/",
  sameSite: "strict" as const,
} as const;

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_CONFIG.baseURL,
      timeout: API_CONFIG.timeout,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    this.client.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = Cookies.get(COOKIE_NAMES.accessToken);

        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
      },
      (error) => Promise.reject(error)
    );

    this.client.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        if (error.response?.status === 401) {
          const refreshed = await this.handleTokenRefresh();

          if (refreshed && error.config) {
            return this.client.request(error.config);
          }

          this.handleUnauthorized();
        }

        return Promise.reject(error);
      }
    );
  }

  private getRefreshToken(): string | undefined {
    return Cookies.get(COOKIE_NAMES.refreshToken);
  }

  private async handleTokenRefresh(): Promise<boolean> {
    const refreshToken = this.getRefreshToken();

    if (!refreshToken) {
      return false;
    }

    try {
      const tempClient = axios.create({
        baseURL: API_CONFIG.baseURL,
        timeout: API_CONFIG.timeout,
      });

      const response = await tempClient.put(
        `${API_CONFIG.endpoints.auth}/refresh-token`,
        { refreshToken }
      );

      const { accessToken, refreshToken: newRefreshToken } = response.data;

      Cookies.set(COOKIE_NAMES.accessToken, accessToken, COOKIE_OPTIONS);

      if (newRefreshToken) {
        Cookies.set(COOKIE_NAMES.refreshToken, newRefreshToken, COOKIE_OPTIONS);
      }

      return true;
    } catch {
      return false;
    }
  }

  private handleUnauthorized(): void {
    Cookies.remove(COOKIE_NAMES.accessToken);
    Cookies.remove(COOKIE_NAMES.refreshToken);
    window.location.href = "/admin/login";
  }

  public getClient(): AxiosInstance {
    return this.client;
  }

  public setTokens(accessToken: string, refreshToken: string): void {
    Cookies.set(COOKIE_NAMES.accessToken, accessToken, COOKIE_OPTIONS);
    Cookies.set(COOKIE_NAMES.refreshToken, refreshToken, COOKIE_OPTIONS);
  }

  public clearTokens(): void {
    Cookies.remove(COOKIE_NAMES.accessToken);
    Cookies.remove(COOKIE_NAMES.refreshToken);
  }
}

export const apiClient = new ApiClient().getClient();
export const tokenManager = new ApiClient();
