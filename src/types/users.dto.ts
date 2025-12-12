export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
  role: "admin" | "manager" | "support";
  isActive: boolean;
}

export interface UpdateUserDto {
  id: string;
  name?: string;
  email?: string;
  password?: string;
  role?: "admin" | "manager" | "support";
  isActive?: boolean;
}

export interface ListUserDto {
  id: string;
  name: string;
  email: string;
  role: "admin" | "manager" | "support";
  isActive: boolean;
  createdAt: string;
  lastLoginAt?: string;
}

export interface ReadUserDto extends ListUserDto {
  updatedAt: string;
}

