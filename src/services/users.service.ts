import {
  CreateUserDto,
  UpdateUserDto,
  ListUserDto,
  ReadUserDto,
} from "@/types/users.dto";
import { delay } from "@/utils/delay";
import { generateId, getCurrentISOString } from "@/utils/idUtils";
import { validateIndex, createNotFoundError } from "@/utils/errorUtils";
import { findById, findIndexById } from "@/utils/arrayUtils";

const mockUsers: ReadUserDto[] = [
  {
    id: "1",
    name: "Admin Principal",
    email: "admin@shareday.com",
    role: "admin",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
    lastLoginAt: "2024-11-20T10:00:00Z",
  },
  {
    id: "2",
    name: "Gerente de Vendas",
    email: "gerente@shareday.com",
    role: "manager",
    isActive: true,
    createdAt: "2024-02-01T00:00:00Z",
    updatedAt: "2024-02-01T00:00:00Z",
    lastLoginAt: "2024-11-19T15:30:00Z",
  },
  {
    id: "3",
    name: "Suporte Técnico",
    email: "suporte@shareday.com",
    role: "support",
    isActive: true,
    createdAt: "2024-03-01T00:00:00Z",
    updatedAt: "2024-03-01T00:00:00Z",
    lastLoginAt: "2024-11-18T09:00:00Z",
  },
];

export const createUser = async (data: CreateUserDto): Promise<ReadUserDto> => {
  await delay(800);

  const newUser: ReadUserDto = {
    id: generateId(),
    name: data.name,
    email: data.email,
    role: data.role,
    isActive: data.isActive,
    createdAt: getCurrentISOString(),
    updatedAt: getCurrentISOString(),
  };

  mockUsers.push(newUser);
  return newUser;
};

export const updateUser = async (data: UpdateUserDto): Promise<ReadUserDto> => {
  await delay(600);

  const userIndex = findIndexById(mockUsers, data.id);
  validateIndex(userIndex, "Usuário");

  const updatedUser: ReadUserDto = {
    ...mockUsers[userIndex],
    ...data,
    updatedAt: getCurrentISOString(),
  };

  mockUsers[userIndex] = updatedUser;
  return updatedUser;
};

export const readUserById = async (id: string): Promise<ReadUserDto> => {
  await delay(400);

  const user = findById(mockUsers, id);
  if (!user) {
    throw createNotFoundError("Usuário");
  }

  return user;
};

export const listUsers = async (): Promise<ListUserDto[]> => {
  await delay(500);

  return mockUsers.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    isActive: user.isActive,
    createdAt: user.createdAt,
    lastLoginAt: user.lastLoginAt,
  }));
};

export const deleteUser = async (id: string): Promise<void> => {
  await delay(400);

  const userIndex = findIndexById(mockUsers, id);
  validateIndex(userIndex, "Usuário");

  mockUsers.splice(userIndex, 1);
};
