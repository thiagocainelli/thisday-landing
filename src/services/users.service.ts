import { apiGet, apiPut, apiDelete, ApiListParams } from "@/lib/api-utils";
import { API_CONFIG } from "@/config/api.config";
import {
  UpdateUserDto,
  UpdateUserPasswordDto,
  ReadUserDto,
  ListUserDto,
} from "@/types/users.dto";

const USERS_ENDPOINT = API_CONFIG.endpoints.users;

export const listUsers = async (
  params: ApiListParams
): Promise<ListUserDto> => {
  return await apiGet<ListUserDto>(`${USERS_ENDPOINT}/list`, {
    page: params.page,
    itemsPerPage: params.itemsPerPage,
    search: params.search,
  });
};

export const getUserByUuid = async (uuid: string): Promise<ReadUserDto> => {
  return await apiGet<ReadUserDto>(`${USERS_ENDPOINT}/find-by-uuid`, { uuid });
};

export const getUserByEmail = async (email: string): Promise<ReadUserDto> => {
  return await apiGet<ReadUserDto>(`${USERS_ENDPOINT}/find-by-email`, {
    email,
  });
};

export const updateUser = async (
  uuid: string,
  data: UpdateUserDto
): Promise<ReadUserDto> => {
  return await apiPut<ReadUserDto, UpdateUserDto>(
    `${USERS_ENDPOINT}/update`,
    data,
    { uuid }
  );
};

export const updateUserPassword = async (
  uuid: string,
  data: UpdateUserPasswordDto
): Promise<ReadUserDto> => {
  return await apiPut<ReadUserDto, UpdateUserPasswordDto>(
    `${USERS_ENDPOINT}/update-password`,
    data,
    { uuid }
  );
};

export const deleteUser = async (uuid: string): Promise<ReadUserDto> => {
  return await apiDelete<ReadUserDto>(`${USERS_ENDPOINT}/soft-delete`, {
    uuid,
  });
};

export const deleteUserFromDatabase = async (
  uuid: string
): Promise<ReadUserDto> => {
  return await apiDelete<ReadUserDto>(`${USERS_ENDPOINT}/delete-database`, {
    uuid,
  });
};

export const restoreUser = async (uuid: string): Promise<ReadUserDto> => {
  return await apiPut<ReadUserDto>(`${USERS_ENDPOINT}/restore`, undefined, {
    uuid,
  });
};
