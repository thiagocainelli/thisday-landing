import { API_CONFIG, getApiUrl } from "@/config/api.config";
import { apiPost } from "@/lib/api-utils";
import {
  CheckoutAdditionalStorageDto,
  CheckoutAdditionalStorageResponseDto,
  CheckoutDto,
  CheckoutResponseDto,
} from "@/types/checkout.dto";

export const processCheckout = async (
  data: CheckoutDto
): Promise<CheckoutResponseDto> => {
  const endpoint = `${API_CONFIG.endpoints.checkout}/process`;
  return await apiPost<CheckoutResponseDto, CheckoutDto>(
    getApiUrl(endpoint),
    data
  );
};

export const processCheckoutAdditionalStorage = async (
  data: CheckoutAdditionalStorageDto
): Promise<CheckoutAdditionalStorageResponseDto> => {
  const endpoint = `${API_CONFIG.endpoints.checkout}/process-additional-storage`;
  return await apiPost<
    CheckoutAdditionalStorageResponseDto,
    CheckoutAdditionalStorageDto
  >(getApiUrl(endpoint), data);
};
