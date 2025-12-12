import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { login, forgotPassword, resetPassword } from "@/services/auth.service";
import { LoginDto, ForgotPasswordDto, ResetPasswordDto } from "@/types/auth.dto";
import { useToast } from "./useToast";

export const useLogin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LoginDto) => login(data),
    onSuccess: (response) => {
      // Salvar token e dados do usuário
      localStorage.setItem("authToken", response.token);
      localStorage.setItem("authUser", JSON.stringify(response.user));
      
      queryClient.setQueryData(["auth", "user"], response.user);
      
      toast({
        title: "Login realizado com sucesso!",
        description: `Bem-vindo, ${response.user.name}!`,
      });
      
      navigate("/admin/dashboard");
    },
    onError: (error: Error) => {
      toast({
        title: "Erro no login",
        description: error.message || "Credenciais inválidas",
        variant: "destructive",
      });
    },
  });
};

export const useForgotPassword = () => {
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: ForgotPasswordDto) => forgotPassword(data),
    onSuccess: () => {
      toast({
        title: "Email enviado!",
        description: "Verifique sua caixa de entrada para redefinir sua senha.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Erro",
        description: error.message || "Não foi possível enviar o email",
        variant: "destructive",
      });
    },
  });
};

export const useResetPassword = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: ResetPasswordDto) => resetPassword(data),
    onSuccess: () => {
      toast({
        title: "Senha redefinida!",
        description: "Sua senha foi alterada com sucesso. Faça login novamente.",
      });
      navigate("/admin/login");
    },
    onError: (error: Error) => {
      toast({
        title: "Erro",
        description: error.message || "Não foi possível redefinir a senha",
        variant: "destructive",
      });
    },
  });
};

