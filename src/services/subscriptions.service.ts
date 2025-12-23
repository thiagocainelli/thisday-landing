import {
  apiGet,
  apiPost,
  apiPut,
  apiDelete,
  ApiListParams,
} from "@/lib/api-utils";
import { API_CONFIG } from "@/config/api.config";
import {
  CreateSubscriptionsDto,
  UpdateSubscriptionsDto,
  ReadSubscriptionsDto,
  ListSubscriptionsDto,
} from "@/types/subscriptions.dto";

const SUBSCRIPTIONS_ENDPOINT = API_CONFIG.endpoints.subscriptions;

export const listSubscriptions = async (
  params: ApiListParams
): Promise<ListSubscriptionsDto> => {
  return await apiGet<ListSubscriptionsDto>(`${SUBSCRIPTIONS_ENDPOINT}/list`, {
    page: params.page,
    itemsPerPage: params.itemsPerPage,
    search: params.search,
  });
};

export const getSubscriptionByUuid = async (
  uuid: string
): Promise<ReadSubscriptionsDto> => {
  return await apiGet<ReadSubscriptionsDto>(
    `${SUBSCRIPTIONS_ENDPOINT}/find-by-uuid`,
    { uuid }
  );
};

export const createSubscription = async (
  data: CreateSubscriptionsDto
): Promise<ReadSubscriptionsDto> => {
  return await apiPost<ReadSubscriptionsDto, CreateSubscriptionsDto>(
    `${SUBSCRIPTIONS_ENDPOINT}/create`,
    data
  );
};

export const updateSubscription = async (
  uuid: string,
  data: UpdateSubscriptionsDto
): Promise<ReadSubscriptionsDto> => {
  return await apiPut<ReadSubscriptionsDto, UpdateSubscriptionsDto>(
    `${SUBSCRIPTIONS_ENDPOINT}/update`,
    data,
    { uuid }
  );
};

export const deleteSubscription = async (
  uuid: string
): Promise<ReadSubscriptionsDto> => {
  return await apiDelete<ReadSubscriptionsDto>(
    `${SUBSCRIPTIONS_ENDPOINT}/delete`,
    { uuid }
  );
};
