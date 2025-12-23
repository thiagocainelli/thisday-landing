import { AxiosError } from "axios";

export interface ApiError {
  message: string;
  statusCode: number;
  statusString: string;
}

export const handleApiError = (error: unknown): ApiError => {
  if (error instanceof AxiosError) {
    const response = error.response?.data as { message?: string } | undefined;
    return {
      message: response?.message || error.message || "Erro desconhecido",
      statusCode: error.response?.status || 500,
      statusString: error.response?.statusText || "Internal Server Error",
    };
  }

  if (error instanceof Error) {
    return {
      message: error.message,
      statusCode: 500,
      statusString: "Internal Server Error",
    };
  }

  return {
    message: "Erro desconhecido",
    statusCode: 500,
    statusString: "Internal Server Error",
  };
};

export const getToastErrorMessage = (error: unknown, fallback: string) => {
  const apiError = handleApiError(error);

  return {
    title: "Erro",
    description: apiError.message || fallback,
  };
};
