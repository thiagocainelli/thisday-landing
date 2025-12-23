import { SettingsDto, UpdateSettingsDto } from "@/types/settings.dto";
import { API_CONFIG, getApiUrl } from "@/config/api.config";
import { apiGet, apiPut } from "@/lib/api-utils";

export const getSettings = async (): Promise<SettingsDto> => {
  const endpoint = `${API_CONFIG.endpoints.settings}/get`;
  return await apiGet<SettingsDto>(getApiUrl(endpoint));
};

export const updateSettings = async (
  data: UpdateSettingsDto
): Promise<SettingsDto> => {
  const endpoint = `${API_CONFIG.endpoints.settings}/update`;
  return await apiPut<SettingsDto, UpdateSettingsDto>(
    getApiUrl(endpoint),
    data
  );
};
