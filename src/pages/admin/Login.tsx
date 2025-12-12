import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useLogin } from "@/hooks/useAuth";
import EmailField from "@/components/forms/EmailField";
import PasswordField from "@/components/forms/PasswordField";
import { loginSchema, type LoginFormData } from "@/schemas/auth.schema";
import { getLoadingButtonLabel } from "@/utils/formUtils";
import AuthCardLayout from "@/components/admin/AuthCardLayout";
import { LogIn } from "lucide-react";

const Login = () => {
  const { mutate: login, isPending } = useLogin();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    login({
      email: data.email,
      password: data.password,
    });
  };

  return (
    <AuthCardLayout
      title="Acesso Administrativo"
      description="Entre com suas credenciais para acessar o painel"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <EmailField
          control={control}
          name="email"
          error={errors.email?.message}
          disabled={isPending}
          showIcon={true}
          required={true}
        />

        <PasswordField
          control={control}
          name="password"
          error={errors.password?.message}
          disabled={isPending}
          showIcon={true}
          required={true}
        />

        <div className="flex items-center justify-end">
          <Link
            to="/admin/forgot-password"
            className="text-sm text-primary hover:underline"
          >
            Esqueceu sua senha?
          </Link>
        </div>

        <Button
          type="submit"
          variant="hero"
          size="lg"
          className="w-full"
          disabled={isPending}
        >
          {getLoadingButtonLabel(isPending, "Entrando...", "Entrar")}
          <LogIn className="ml-2 h-4 w-4" />
        </Button>
      </form>

      <div className="mt-6 p-4 bg-muted/50 rounded-lg">
        <p className="text-xs text-muted-foreground mb-2 font-semibold">
          Credenciais de teste:
        </p>
        <div className="text-xs text-muted-foreground space-y-1">
          <p>
            <strong>Admin:</strong> admin@shareday.com / admin123
          </p>
          <p>
            <strong>Gerente:</strong> gerente@shareday.com / gerente123
          </p>
          <p>
            <strong>Suporte:</strong> suporte@shareday.com / suporte123
          </p>
        </div>
      </div>
    </AuthCardLayout>
  );
};

export default Login;
