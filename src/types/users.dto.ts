import { UserTypeEnum } from "./enums";

export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
  type: UserTypeEnum;
  profileImageUrl?: string;
  isActive: boolean;
}

export interface UpdateUserDto {
  name?: string;
  email?: string;
  password?: string;
  type?: UserTypeEnum;
  isActive?: boolean;
}

export interface UpdateUserPasswordDto {
  oldPassword: string;
  newPassword: string;
}

export interface ReadUserDto {
  uuid: string;
  name: string;
  expiresTokenIn: string;
  refreshToken: string;
  email: string;
  type: UserTypeEnum;
  profileImageUrl: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export interface ReadUserListDto {
  uuid: string;
  name: string;
  email: string;
  type: UserTypeEnum;
  profileImageUrl: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export interface ListUserDto {
  data: ReadUserListDto[];
  total: number;
}
