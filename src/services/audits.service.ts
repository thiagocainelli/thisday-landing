import { apiGet, ApiListParams } from "@/lib/api-utils";
import { API_CONFIG } from "@/config/api.config";
import { ListAuditsDto, ReadAuditDto } from "@/types/audits.dto";

const AUDITS_ENDPOINT = API_CONFIG.endpoints.audits;

export interface AuditListParams extends ApiListParams {
  initDate?: string;
  endDate?: string;
}

export const listAudits = async (
  params: AuditListParams
): Promise<ListAuditsDto> => {
  return await apiGet<ListAuditsDto>(`${AUDITS_ENDPOINT}/list`, {
    page: params.page,
    itemsPerPage: params.itemsPerPage,
    search: params.search,
    initDate: params.initDate,
    endDate: params.endDate,
  });
};

export const getAuditByUuid = async (uuid: string): Promise<ReadAuditDto> => {
  return await apiGet<ReadAuditDto>(`${AUDITS_ENDPOINT}/find-by-uuid`, {
    uuid,
  });
};
