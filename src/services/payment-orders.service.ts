import {
  apiGet,
  apiPost,
  apiPut,
  apiDelete,
  ApiListParams,
} from "@/lib/api-utils";
import { API_CONFIG } from "@/config/api.config";
import {
  CreatePaymentOrdersDto,
  UpdatePaymentOrdersDto,
  ReadPaymentOrdersDto,
  ListPaymentOrdersDto,
} from "@/types/payment-orders.dto";

const PAYMENT_ORDERS_ENDPOINT = API_CONFIG.endpoints.paymentOrders;

export const listPaymentOrders = async (
  params: ApiListParams
): Promise<ListPaymentOrdersDto> => {
  return await apiGet<ListPaymentOrdersDto>(`${PAYMENT_ORDERS_ENDPOINT}/list`, {
    page: params.page,
    itemsPerPage: params.itemsPerPage,
    search: params.search,
  });
};

export const getPaymentOrderByUuid = async (
  uuid: string
): Promise<ReadPaymentOrdersDto> => {
  return await apiGet<ReadPaymentOrdersDto>(
    `${PAYMENT_ORDERS_ENDPOINT}/find-by-uuid`,
    { uuid }
  );
};

export const createPaymentOrder = async (
  data: CreatePaymentOrdersDto
): Promise<ReadPaymentOrdersDto> => {
  return await apiPost<ReadPaymentOrdersDto, CreatePaymentOrdersDto>(
    `${PAYMENT_ORDERS_ENDPOINT}/create`,
    data
  );
};

export const updatePaymentOrder = async (
  uuid: string,
  data: UpdatePaymentOrdersDto
): Promise<ReadPaymentOrdersDto> => {
  return await apiPut<ReadPaymentOrdersDto, UpdatePaymentOrdersDto>(
    `${PAYMENT_ORDERS_ENDPOINT}/update`,
    data,
    { uuid }
  );
};

export const deletePaymentOrder = async (
  uuid: string
): Promise<ReadPaymentOrdersDto> => {
  return await apiDelete<ReadPaymentOrdersDto>(
    `${PAYMENT_ORDERS_ENDPOINT}/delete`,
    { uuid }
  );
};
