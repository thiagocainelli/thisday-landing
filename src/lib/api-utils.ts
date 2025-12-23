import { apiClient } from "./api-client";
import { AxiosResponse } from "axios";

export interface ApiListParams {
  page: number;
  itemsPerPage: number;
  search?: string;
}

export interface ApiListResponse<T> {
  data: T[];
  total: number;
}

export const apiGet = async <T>(
  endpoint: string,
  params?: Record<string, unknown>
): Promise<T> => {
  const response: AxiosResponse<T> = await apiClient.get(endpoint, { params });
  return response.data;
};

export const apiPost = async <T, D = unknown>(
  endpoint: string,
  data?: D
): Promise<T> => {
  const response: AxiosResponse<T> = await apiClient.post(endpoint, data);
  return response.data;
};

export const apiPut = async <T, D = unknown>(
  endpoint: string,
  data?: D,
  params?: Record<string, unknown>
): Promise<T> => {
  const response: AxiosResponse<T> = await apiClient.put(endpoint, data, {
    params,
  });
  return response.data;
};

export const apiDelete = async <T>(
  endpoint: string,
  params?: Record<string, unknown>
): Promise<T> => {
  const response: AxiosResponse<T> = await apiClient.delete(endpoint, {
    params,
  });
  return response.data;
};

export const apiUpload = async <T>(
  endpoint: string,
  formData: FormData,
  onUploadProgress?: (progress: number) => void
): Promise<T> => {
  const response: AxiosResponse<T> = await apiClient.post(endpoint, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress: (progressEvent) => {
      if (onUploadProgress && progressEvent.total) {
        const progress = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        onUploadProgress(progress);
      }
    },
  });
  return response.data;
};
