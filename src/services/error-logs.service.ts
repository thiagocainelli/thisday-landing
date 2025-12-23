import { apiGet, ApiListParams } from "@/lib/api-utils";
import { API_CONFIG } from "@/config/api.config";
import { ListErrorLogsDto, ReadErrorLogDto } from "@/types/error-logs.dto";

const ERROR_LOGS_ENDPOINT = API_CONFIG.endpoints.errorLogs;

export interface ErrorLogListParams extends ApiListParams {
  initDate?: string;
  endDate?: string;
}

export const listErrorLogs = async (
  params: ErrorLogListParams
): Promise<ListErrorLogsDto> => {
  return await apiGet<ListErrorLogsDto>(`${ERROR_LOGS_ENDPOINT}/list`, {
    page: params.page,
    itemsPerPage: params.itemsPerPage,
    search: params.search,
    initDate: params.initDate,
    endDate: params.endDate,
  });
};

export const getErrorLogByUuid = async (
  uuid: string
): Promise<ReadErrorLogDto> => {
  return await apiGet<ReadErrorLogDto>(`${ERROR_LOGS_ENDPOINT}/find-by-uuid`, {
    uuid,
  });
};
