import { useQuery } from "@tanstack/react-query";
import {
  listAudits,
  getAuditByUuid,
  AuditListParams,
} from "@/services/audits.service";
import { ReadAuditDto } from "@/types/audits.dto";

export const useAudits = (params: AuditListParams) => {
  return useQuery({
    queryKey: ["audits", params],
    queryFn: () =>
      listAudits({
        page: params.page,
        itemsPerPage: params.itemsPerPage,
        search: params.search,
        initDate: params.initDate,
        endDate: params.endDate,
      }),
  });
};

export const useAudit = (uuid: string | undefined) => {
  return useQuery({
    queryKey: ["audits", uuid],
    queryFn: () => {
      if (!uuid) {
        throw new Error("UUID é obrigatório");
      }
      return getAuditByUuid(uuid);
    },
    enabled: !!uuid,
  });
};
