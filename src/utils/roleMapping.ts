export const roleMap: Record<string, string> = {
  admin: "Administrador",
  manager: "Gerente",
  support: "Suporte",
};

export const getRoleLabel = (role: string): string => {
  return roleMap[role] || role;
};
