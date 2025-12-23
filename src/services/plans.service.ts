import {
  apiGet,
  apiPost,
  apiPut,
  apiDelete,
  ApiListParams,
} from "@/lib/api-utils";
import { API_CONFIG } from "@/config/api.config";
import {
  CreatePlansDto,
  UpdatePlansDto,
  ReadPlansDto,
  ListPlansDto,
} from "@/types/plans.dto";

const PLANS_ENDPOINT = API_CONFIG.endpoints.plans;

export const listPlans = async (
  params: ApiListParams
): Promise<ListPlansDto> => {
  return await apiGet<ListPlansDto>(`${PLANS_ENDPOINT}/list`, {
    page: params.page,
    itemsPerPage: params.itemsPerPage,
    search: params.search,
  });
};

export const getPlanByUuid = async (uuid: string): Promise<ReadPlansDto> => {
  return await apiGet<ReadPlansDto>(`${PLANS_ENDPOINT}/find-by-uuid`, { uuid });
};

export const createPlan = async (
  data: CreatePlansDto
): Promise<ReadPlansDto> => {
  return await apiPost<ReadPlansDto, CreatePlansDto>(
    `${PLANS_ENDPOINT}/create`,
    data
  );
};

export const updatePlan = async (
  uuid: string,
  data: UpdatePlansDto
): Promise<ReadPlansDto> => {
  return await apiPut<ReadPlansDto, UpdatePlansDto>(
    `${PLANS_ENDPOINT}/update`,
    data,
    { uuid }
  );
};

export const deletePlan = async (uuid: string): Promise<ReadPlansDto> => {
  return await apiDelete<ReadPlansDto>(`${PLANS_ENDPOINT}/delete`, { uuid });
};
