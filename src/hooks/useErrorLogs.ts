import { useQuery } from "@tanstack/react-query";
import {
  listErrorLogs,
  getErrorLogByUuid,
  ErrorLogListParams,
} from "@/services/error-logs.service";

export const useErrorLogs = (params: ErrorLogListParams) => {
  return useQuery({
    queryKey: ["errorLogs", params],
    queryFn: () =>
      listErrorLogs({
        page: params.page,
        itemsPerPage: params.itemsPerPage,
        search: params.search,
        initDate: params.initDate,
        endDate: params.endDate,
      }),
  });
};

export const useErrorLog = (uuid: string | undefined) => {
  return useQuery({
    queryKey: ["errorLogs", uuid],
    queryFn: () => {
      if (!uuid) {
        throw new Error("UUID é obrigatório");
      }
      return getErrorLogByUuid(uuid);
    },
    enabled: !!uuid,
  });
};


