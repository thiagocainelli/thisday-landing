import {
  LoginDto,
  ForgotPasswordDto,
  ResetPasswordDto,
  AuthResponseDto,
} from "@/types/auth.dto";
import { delay } from "@/utils/delay";
import { generateId } from "@/utils/idUtils";

// Mock de usuários autenticados
const mockAuthUsers = [
  {
    email: "admin@shareday.com",
    password: "admin123",
    user: {
      id: "1",
      name: "Admin Principal",
      email: "admin@shareday.com",
      role: "admin" as const,
    },
  },
  {
    email: "gerente@shareday.com",
    password: "gerente123",
    user: {
      id: "2",
      name: "Gerente de Vendas",
      email: "gerente@shareday.com",
      role: "manager" as const,
    },
  },
  {
    email: "suporte@shareday.com",
    password: "suporte123",
    user: {
      id: "3",
      name: "Suporte Técnico",
      email: "suporte@shareday.com",
      role: "support" as const,
    },
  },
];

export const login = async (data: LoginDto): Promise<AuthResponseDto> => {
  await delay(1000);

  const user = mockAuthUsers.find(
    (u) => u.email === data.email && u.password === data.password
  );

  if (!user) {
    throw new Error("Credenciais inválidas");
  }

  return {
    user: user.user,
    token: `mock-token-${user.user.id}-${generateId()}`,
  };
};

export const forgotPassword = async (
  data: ForgotPasswordDto
): Promise<void> => {
  await delay(800);

  const user = mockAuthUsers.find((u) => u.email === data.email);

  if (!user) {
    // Por segurança, não revelamos se o email existe ou não
    return;
  }

  // Em produção, enviaria email com token de recuperação
  console.log(`Token de recuperação enviado para ${data.email}`);
};

export const resetPassword = async (data: ResetPasswordDto): Promise<void> => {
  await delay(800);

  if (data.password !== data.confirmPassword) {
    throw new Error("As senhas não coincidem");
  }

  // Em produção, validaria o token
  if (!data.token || data.token.length < 10) {
    throw new Error("Token inválido ou expirado");
  }

  // Simular atualização de senha
  console.log("Senha redefinida com sucesso");
};
