export interface CreateStorageDto {
  name: string;
  mimetype: string;
  url: string;
  key: string;
  type?: string;
  isPrivate?: boolean;
  sizeKB?: number;
  eventUuid?: string;
  userUuid?: string;
}

export interface ReadStorageDto {
  uuid: string;
  name: string;
  mimetype: string;
  url: string;
  key: string;
  isPrivate: boolean;
  sizeKB: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export interface ReadListStorageDto {
  uuid: string;
  name: string;
  mimetype: string;
  url: string;
  key: string;
  isPrivate: boolean;
  sizeKB: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export interface ListStorageDto {
  data: ReadListStorageDto[];
  total: number;
  totalSize: number; // Total size in GB
}
