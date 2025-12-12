import { Link, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useResetPassword } from "@/hooks/useAuth";
import PasswordField from "@/components/forms/PasswordField";
import {
  resetPasswordSchema,
  type ResetPasswordFormData,
} from "@/schemas/auth.schema";
import { getLoadingButtonLabel } from "@/utils/formUtils";
import AuthCardLayout from "@/components/admin/AuthCardLayout";
import AuthSuccessState from "@/components/admin/AuthSuccessState";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";
  const { mutate: resetPassword, isPending, isSuccess } = useResetPassword();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = (data: ResetPasswordFormData) => {
    resetPassword({
      token,
      password: data.password,
      confirmPassword: data.confirmPassword,
    });
  };

  return (
    <AuthCardLayout
      title="Redefinir Senha"
      description="Digite sua nova senha abaixo"
    >
      {isSuccess ? (
        <AuthSuccessState
          icon={CheckCircle2}
          title="Senha redefinida!"
          description="Sua senha foi alterada com sucesso. Faça login com sua nova senha."
          buttonText="Ir para login"
          buttonHref="/admin/login"
        />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <PasswordField
            control={control}
            name="password"
            label="Nova Senha"
            error={errors.password?.message}
            disabled={isPending}
            showIcon={true}
            required={true}
          />

          <PasswordField
            control={control}
            name="confirmPassword"
            label="Confirmar Senha"
            error={errors.confirmPassword?.message}
            disabled={isPending}
            showIcon={true}
            required={true}
          />

          <Button
            type="submit"
            variant="hero"
            size="lg"
            className="w-full"
            disabled={isPending}
          >
            {getLoadingButtonLabel(
              isPending,
              "Redefinindo...",
              "Redefinir senha"
            )}
          </Button>

          <Button variant="ghost" asChild className="w-full">
            <Link to="/admin/login">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para login
            </Link>
          </Button>
        </form>
      )}
    </AuthCardLayout>
  );
};

export default ResetPassword;
