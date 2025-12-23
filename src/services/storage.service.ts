import {
  apiGet,
  apiDelete,
  apiPut,
  apiUpload,
  ApiListParams,
} from "@/lib/api-utils";
import { API_CONFIG } from "@/config/api.config";
import { ReadStorageDto, ListStorageDto } from "@/types/storage.dto";

const STORAGE_ENDPOINT = API_CONFIG.endpoints.storage;

export const uploadFiles = async (
  files: File[],
  onUploadProgress?: (progress: number) => void
): Promise<ReadStorageDto[]> => {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append("files", file);
  });

  return await apiUpload<ReadStorageDto[]>(
    `${STORAGE_ENDPOINT}/upload-files`,
    formData,
    onUploadProgress
  );
};

export const uploadFilesToEvent = async (
  eventUuid: string,
  files: File[],
  onUploadProgress?: (progress: number) => void
): Promise<ReadStorageDto[]> => {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append("files", file);
  });

  return await apiUpload<ReadStorageDto[]>(
    `${API_CONFIG.endpoints.events}/upload-files?eventUuid=${eventUuid}`,
    formData,
    onUploadProgress
  );
};

export const uploadProfileImage = async (
  file: File,
  onUploadProgress?: (progress: number) => void
): Promise<ReadStorageDto> => {
  const formData = new FormData();
  formData.append("file", file);

  return await apiUpload<ReadStorageDto>(
    `${STORAGE_ENDPOINT}/profile-image`,
    formData,
    onUploadProgress
  );
};

export const listStorage = async (
  params: ApiListParams
): Promise<ListStorageDto> => {
  return await apiGet<ListStorageDto>(`${STORAGE_ENDPOINT}/list`, {
    page: params.page,
    itemsPerPage: params.itemsPerPage,
    search: params.search,
  });
};

export const getStorageByUuid = async (
  uuid: string
): Promise<ReadStorageDto> => {
  return await apiGet<ReadStorageDto>(`${STORAGE_ENDPOINT}/find-by-uuid`, {
    uuid,
  });
};

export const deleteStorage = async (uuid: string): Promise<ReadStorageDto> => {
  return await apiDelete<ReadStorageDto>(`${STORAGE_ENDPOINT}/soft-delete`, {
    uuid,
  });
};

export const restoreStorage = async (uuid: string): Promise<ReadStorageDto> => {
  return await apiPut<ReadStorageDto>(
    `${STORAGE_ENDPOINT}/restore`,
    undefined,
    {
      uuid,
    }
  );
};

export const getStorageByEvent = async (
  eventUuid: string,
  page: number = 1,
  itemsPerPage: number = 100
): Promise<ListStorageDto> => {
  return await apiGet<ListStorageDto>(`${STORAGE_ENDPOINT}/find-by-event`, {
    eventUuid,
    page,
    itemsPerPage,
  });
};
