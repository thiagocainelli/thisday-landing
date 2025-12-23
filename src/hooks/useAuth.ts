import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {
  login,
  forgotPassword,
  resetPassword,
  verifyToken,
  logout as logoutService,
} from "@/services/auth.service";
import {
  AuthLoginDto,
  AuthForgotPasswordDto,
  AuthResetPasswordDto,
} from "@/types/auth.dto";
import { useToast } from "./useToast";
import { ReadUserDto } from "@/types/users.dto";
import { getToastErrorMessage } from "@/utils/api-error-handler";

export const useLogin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AuthLoginDto) => login(data),
    onSuccess: (response) => {
      queryClient.setQueryData(["auth", "user"], response.userData);

      toast({
        title: "Login realizado com sucesso!",
        description: `Bem-vindo, ${response.userData.name}!`,
      });

      navigate("/admin/dashboard");
    },
    onError: (error: unknown) => {
      const { description } = getToastErrorMessage(
        error,
        "Credenciais inválidas",
      );
      toast({
        title: "Erro no login",
        description,
        variant: "destructive",
      });
    },
  });
};

export const useForgotPassword = () => {
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: AuthForgotPasswordDto) => forgotPassword(data),
    onSuccess: () => {
      toast({
        title: "Email enviado!",
        description: "Verifique sua caixa de entrada para redefinir sua senha.",
      });
    },
    onError: (error: unknown) => {
      const { description } = getToastErrorMessage(
        error,
        "Não foi possível enviar o email",
      );
      toast({
        title: "Erro",
        description,
        variant: "destructive",
      });
    },
  });
};

export const useResetPassword = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: AuthResetPasswordDto) => resetPassword(data),
    onSuccess: () => {
      toast({
        title: "Senha redefinida!",
        description:
          "Sua senha foi alterada com sucesso. Faça login novamente.",
      });
      navigate("/admin/login");
    },
    onError: (error: unknown) => {
      const { description } = getToastErrorMessage(
        error,
        "Não foi possível redefinir a senha",
      );
      toast({
        title: "Erro",
        description,
        variant: "destructive",
      });
    },
  });
};

export const useVerifyToken = () => {
  return useQuery<ReadUserDto>({
    queryKey: ["auth", "user"],
    queryFn: verifyToken,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
};

export const useAuth = () => {
  const { data: user } = useVerifyToken();
  return { user };
};

export const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return () => {
    logoutService();
    queryClient.clear();
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso.",
    });
    navigate("/admin/login");
  };
};
