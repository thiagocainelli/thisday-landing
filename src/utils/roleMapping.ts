import { UserTypeEnum } from "@/types/enums";

export const roleMap: Record<string, string> = {
  [UserTypeEnum.ADMIN]: "Administrador",
  [UserTypeEnum.CUSTOMER]: "Cliente",
};

export const getRoleLabel = (role: string): string => {
  return roleMap[role] || role;
};
