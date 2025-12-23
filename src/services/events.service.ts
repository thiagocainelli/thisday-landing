import {
  apiGet,
  apiPost,
  apiPut,
  apiDelete,
  ApiListParams,
} from "@/lib/api-utils";
import { API_CONFIG } from "@/config/api.config";
import {
  CreateEventsDto,
  UpdateEventsDto,
  ReadEventsDto,
  ListEventsDto,
} from "@/types/events.dto";
import { EventWithDetailsDto } from "@/types/event-with-details.dto";

const EVENTS_ENDPOINT = API_CONFIG.endpoints.events;

export const listEvents = async (
  params: ApiListParams
): Promise<ListEventsDto> => {
  return await apiGet<ListEventsDto>(`${EVENTS_ENDPOINT}/list`, {
    page: params.page,
    itemsPerPage: params.itemsPerPage,
    search: params.search,
  });
};

export const getEventByUuid = async (uuid: string): Promise<ReadEventsDto> => {
  return await apiGet<ReadEventsDto>(`${EVENTS_ENDPOINT}/find-by-uuid`, {
    uuid,
  });
};

export const getEventByShareCode = async (
  shareCode: string
): Promise<ReadEventsDto> => {
  return await apiGet<ReadEventsDto>(`${EVENTS_ENDPOINT}/find-by-share-code`, {
    shareCode,
  });
};

export const getEventWithDetails = async (
  uuid: string
): Promise<EventWithDetailsDto> => {
  return await apiGet<EventWithDetailsDto>(
    `${EVENTS_ENDPOINT}/find-by-uuid-with-details`,
    { uuid }
  );
};

export const createEvent = async (
  data: CreateEventsDto
): Promise<ReadEventsDto> => {
  return await apiPost<ReadEventsDto, CreateEventsDto>(
    `${EVENTS_ENDPOINT}/create`,
    data
  );
};

export const updateEvent = async (
  uuid: string,
  data: UpdateEventsDto
): Promise<ReadEventsDto> => {
  return await apiPut<ReadEventsDto, UpdateEventsDto>(
    `${EVENTS_ENDPOINT}/update`,
    data,
    { uuid }
  );
};

export const deleteEvent = async (uuid: string): Promise<ReadEventsDto> => {
  return await apiDelete<ReadEventsDto>(`${EVENTS_ENDPOINT}/delete`, { uuid });
};
