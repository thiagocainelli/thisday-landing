import {
  apiGet,
  apiPost,
  apiPut,
  apiDelete,
  ApiListParams,
} from "@/lib/api-utils";
import { API_CONFIG } from "@/config/api.config";
import {
  CreatePaymentTransactionsDto,
  UpdatePaymentTransactionsDto,
  ReadPaymentTransactionsDto,
  ListPaymentTransactionsDto,
} from "@/types/payment-transactions.dto";

const PAYMENT_TRANSACTIONS_ENDPOINT = API_CONFIG.endpoints.paymentTransactions;

export const listPaymentTransactions = async (
  params: ApiListParams
): Promise<ListPaymentTransactionsDto> => {
  return await apiGet<ListPaymentTransactionsDto>(
    `${PAYMENT_TRANSACTIONS_ENDPOINT}/list`,
    {
      page: params.page,
      itemsPerPage: params.itemsPerPage,
      search: params.search,
    }
  );
};

export const getPaymentTransactionByUuid = async (
  uuid: string
): Promise<ReadPaymentTransactionsDto> => {
  return await apiGet<ReadPaymentTransactionsDto>(
    `${PAYMENT_TRANSACTIONS_ENDPOINT}/find-by-uuid`,
    { uuid }
  );
};

export const createPaymentTransaction = async (
  data: CreatePaymentTransactionsDto
): Promise<ReadPaymentTransactionsDto> => {
  return await apiPost<
    ReadPaymentTransactionsDto,
    CreatePaymentTransactionsDto
  >(`${PAYMENT_TRANSACTIONS_ENDPOINT}/create`, data);
};

export const updatePaymentTransaction = async (
  uuid: string,
  data: UpdatePaymentTransactionsDto
): Promise<ReadPaymentTransactionsDto> => {
  return await apiPut<ReadPaymentTransactionsDto, UpdatePaymentTransactionsDto>(
    `${PAYMENT_TRANSACTIONS_ENDPOINT}/update`,
    data,
    { uuid }
  );
};

export const deletePaymentTransaction = async (
  uuid: string
): Promise<ReadPaymentTransactionsDto> => {
  return await apiDelete<ReadPaymentTransactionsDto>(
    `${PAYMENT_TRANSACTIONS_ENDPOINT}/delete`,
    { uuid }
  );
};
