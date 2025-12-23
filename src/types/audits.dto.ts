export interface ReadAuditDto {
  uuid: string;
  userUuid: string;
  ip: string;
  url: string;
  entity: string;
  event: string;
  method: string;
  userAgent: string;
  oldData: string;
  newData: string;
  params: string;
  query: string;
  body: string;
  headers: string;
  createdAt: Date;
}

export interface ListAuditsDto {
  data: ReadAuditDto[];
  total: number;
}
