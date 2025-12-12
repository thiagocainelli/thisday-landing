import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Send, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useForgotPassword } from "@/hooks/useAuth";
import EmailField from "@/components/forms/EmailField";
import {
  forgotPasswordSchema,
  type ForgotPasswordFormData,
} from "@/schemas/auth.schema";
import { getLoadingButtonLabel } from "@/utils/formUtils";
import AuthCardLayout from "@/components/admin/AuthCardLayout";
import AuthSuccessState from "@/components/admin/AuthSuccessState";

const ForgotPassword = () => {
  const { mutate: forgotPassword, isPending, isSuccess } = useForgotPassword();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = (data: ForgotPasswordFormData) => {
    forgotPassword({ email: data.email });
  };

  return (
    <AuthCardLayout
      icon={Mail}
      title="Recuperar Senha"
      description="Digite seu e-mail para receber instruções de recuperação"
    >
      {isSuccess ? (
        <AuthSuccessState
          icon={Send}
          title="Email enviado!"
          description="Verifique sua caixa de entrada. Enviamos um link para redefinir sua senha."
          buttonText="Voltar para login"
          buttonHref="/admin/login"
          buttonVariant="outline"
        />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <EmailField
            control={control}
            name="email"
            error={errors.email?.message}
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
              "Enviando...",
              "Enviar instruções"
            )}
            <Send className="ml-2 h-4 w-4" />
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

export default ForgotPassword;
