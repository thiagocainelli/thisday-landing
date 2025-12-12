import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { Lock, User, Mail, Shield, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import AdminBreadcrumb from "@/components/admin/AdminBreadcrumb";
import PasswordField from "@/components/forms/PasswordField";
import { getRoleLabel } from "@/utils/roleMapping";
import { useToast } from "@/hooks/useToast";
import { delay } from "@/utils/delay";
import { getLoadingButtonLabel } from "@/utils/formUtils";
import { z } from "zod";

const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(6, "Senha atual deve ter pelo menos 6 caracteres"),
    newPassword: z.string().min(6, "Nova senha deve ter pelo menos 6 caracteres"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const authUser = JSON.parse(localStorage.getItem("authUser") || "{}");

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
  });

  const handleChangePassword = async (data: ChangePasswordFormData) => {
    setIsChangingPassword(true);
    try {
      await delay(800);
      
      // Em produção, validaria a senha atual e atualizaria
      toast({
        title: "Senha alterada",
        description: "Sua senha foi alterada com sucesso.",
      });
      
      reset();
      setShowPasswordForm(false);
    } catch (error) {
      toast({
        title: "Erro ao alterar senha",
        description: "Não foi possível alterar a senha. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsChangingPassword(false);
    }
  };

  return (
    <div className="space-y-6">
      <AdminBreadcrumb
        items={[
          { label: "Dashboard", href: "/admin/dashboard" },
          { label: "Perfil", href: "/admin/profile" },
        ]}
      />

      <div className="space-y-6">
        {/* Informações do Usuário */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Informações do Perfil
            </CardTitle>
            <CardDescription>
              Visualize suas informações de conta
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-center mb-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-primary-foreground font-bold text-2xl shadow-lg">
                {authUser.name?.charAt(0)?.toUpperCase() || "U"}
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-muted-foreground">
                  <User className="h-4 w-4" />
                  Nome
                </Label>
                <div className="px-3 py-2 bg-slate-50 dark:bg-slate-900 rounded-md border border-slate-200 dark:border-slate-800">
                  <p className="text-sm font-medium">{authUser.name || "Não informado"}</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  E-mail
                </Label>
                <div className="px-3 py-2 bg-slate-50 dark:bg-slate-900 rounded-md border border-slate-200 dark:border-slate-800">
                  <p className="text-sm font-medium">{authUser.email || "Não informado"}</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-muted-foreground">
                  <Shield className="h-4 w-4" />
                  Tipo de Usuário
                </Label>
                <div className="px-3 py-2 bg-slate-50 dark:bg-slate-900 rounded-md border border-slate-200 dark:border-slate-800">
                  <p className="text-sm font-medium">
                    {authUser.role ? getRoleLabel(authUser.role) : "Não informado"}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Alterar Senha */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Alterar Senha
            </CardTitle>
            <CardDescription>
              Altere sua senha de acesso
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!showPasswordForm ? (
              <Button
                variant="outline"
                onClick={() => setShowPasswordForm(true)}
                className="w-full"
              >
                <Lock className="mr-2 h-4 w-4" />
                Alterar Senha
              </Button>
            ) : (
              <form onSubmit={handleSubmit(handleChangePassword)} className="space-y-4">
                <PasswordField
                  control={control}
                  name="currentPassword"
                  label="Senha Atual"
                  error={errors.currentPassword?.message}
                  disabled={isChangingPassword}
                  showIcon={true}
                  required={true}
                />

                <Separator />

                <PasswordField
                  control={control}
                  name="newPassword"
                  label="Nova Senha"
                  error={errors.newPassword?.message}
                  disabled={isChangingPassword}
                  showIcon={true}
                  required={true}
                />

                <PasswordField
                  control={control}
                  name="confirmPassword"
                  label="Confirmar Nova Senha"
                  error={errors.confirmPassword?.message}
                  disabled={isChangingPassword}
                  showIcon={true}
                  required={true}
                />

                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowPasswordForm(false);
                      reset();
                    }}
                    disabled={isChangingPassword}
                    className="flex-1"
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    variant="hero"
                    disabled={isChangingPassword}
                    className="flex-1"
                  >
                    {getLoadingButtonLabel(
                      isChangingPassword,
                      "Alterando...",
                      "Alterar Senha"
                    )}
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>

        <div className="flex justify-start">
          <Button
            variant="ghost"
            onClick={() => navigate("/admin/dashboard")}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar para Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;

