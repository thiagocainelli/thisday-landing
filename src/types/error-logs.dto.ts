export interface ReadErrorLogDto {
  uuid: string;
  statusCode: number;
  error: string;
  message: string;
  url: string;
  headers: string;
  method: string;
  createdAt: Date;
}

export interface ListErrorLogsDto {
  data: ReadErrorLogDto[];
  total: number;
}
