import {
  apiGet,
  apiPost,
  apiPut,
  apiDelete,
  ApiListParams,
} from "@/lib/api-utils";
import { API_CONFIG } from "@/config/api.config";
import {
  CreateCustomersDto,
  UpdateCustomersDto,
  ReadCustomersDto,
  ListCustomersDto,
} from "@/types/customers.dto";

const CUSTOMERS_ENDPOINT = API_CONFIG.endpoints.customers;

export const listCustomers = async (
  params: ApiListParams
): Promise<ListCustomersDto> => {
  return await apiGet<ListCustomersDto>(`${CUSTOMERS_ENDPOINT}/list`, {
    page: params.page,
    itemsPerPage: params.itemsPerPage,
    search: params.search,
  });
};

export const getCustomerByUuid = async (
  uuid: string
): Promise<ReadCustomersDto> => {
  return await apiGet<ReadCustomersDto>(`${CUSTOMERS_ENDPOINT}/find-by-uuid`, {
    uuid,
  });
};

export const createCustomer = async (
  data: CreateCustomersDto
): Promise<ReadCustomersDto> => {
  return await apiPost<ReadCustomersDto, CreateCustomersDto>(
    `${CUSTOMERS_ENDPOINT}/create`,
    data
  );
};

export const updateCustomer = async (
  uuid: string,
  data: UpdateCustomersDto
): Promise<ReadCustomersDto> => {
  return await apiPut<ReadCustomersDto, UpdateCustomersDto>(
    `${CUSTOMERS_ENDPOINT}/update`,
    data,
    { uuid }
  );
};

export const deleteCustomer = async (
  uuid: string
): Promise<ReadCustomersDto> => {
  return await apiDelete<ReadCustomersDto>(`${CUSTOMERS_ENDPOINT}/delete`, {
    uuid,
  });
};
