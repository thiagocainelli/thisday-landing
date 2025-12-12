import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useCreateUser, useUpdateUser, useUser } from "@/hooks/useUsers";
import { CreateUserDto, UpdateUserDto } from "@/types/users.dto";
import NameField from "@/components/forms/NameField";
import EmailField from "@/components/forms/EmailField";
import PasswordField from "@/components/forms/PasswordField";
import FormFieldWrapper from "@/components/forms/FormFieldWrapper";
import { userSchema, type UserFormData } from "@/schemas/user.schema";
import { getSubmitButtonLabel } from "@/utils/formUtils";

interface UserFormProps {
  userId?: string;
  onSuccess: () => void;
  onCancel: () => void;
}

const UserForm = ({ userId, onSuccess, onCancel }: UserFormProps) => {
  const { data: user } = useUser(userId);
  const { mutate: createUser, isPending: isCreating } = useCreateUser();
  const { mutate: updateUser, isPending: isUpdating } = useUpdateUser();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      isActive: true,
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
      });
    }
  }, [user, reset]);

  const onSubmit = (data: UserFormData) => {
    if (userId) {
      const updateData: UpdateUserDto = {
        id: userId,
        name: data.name,
        email: data.email,
        role: data.role,
        isActive: data.isActive,
        ...(data.password && { password: data.password }),
      };
      updateUser(updateData, { onSuccess });
    } else {
      if (!data.password) {
        return;
      }
      const createData: CreateUserDto = {
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role,
        isActive: data.isActive,
      };
      createUser(createData, { onSuccess });
    }
  };

  const isPending = isCreating || isUpdating;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <NameField
          control={control}
          name="name"
          label="Nome"
          error={errors.name?.message}
          disabled={isPending}
          required={true}
        />

        <EmailField
          control={control}
          name="email"
          label="E-mail"
          error={errors.email?.message}
          disabled={isPending}
          required={true}
        />

        <PasswordField
          control={control}
          name="password"
          label={userId ? "Senha (deixe em branco para manter)" : "Senha"}
          error={errors.password?.message}
          disabled={isPending}
          required={!userId}
        />

        <FormFieldWrapper
          label="Função"
          htmlFor="role"
          required={true}
          error={errors.role?.message}
        >
          <Controller
            name="role"
            control={control}
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={field.onChange}
                disabled={isPending}
              >
                <SelectTrigger
                  id="role"
                  className={cn(errors.role && "border-destructive")}
                >
                  <SelectValue placeholder="Selecione a função" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Administrador</SelectItem>
                  <SelectItem value="manager">Gerente</SelectItem>
                  <SelectItem value="support">Suporte</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </FormFieldWrapper>

        <FormFieldWrapper label="Status" htmlFor="isActive">
          <Controller
            name="isActive"
            control={control}
            render={({ field }) => (
              <div className="flex items-center space-x-2">
                <Switch
                  id="isActive"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={isPending}
                />
                <Label htmlFor="isActive" className="cursor-pointer">
                  {field.value ? "Ativo" : "Inativo"}
                </Label>
              </div>
            )}
          />
        </FormFieldWrapper>
      </div>

      <div className="flex justify-end gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isPending}
        >
          Cancelar
        </Button>
        <Button type="submit" variant="hero" disabled={isPending}>
          {getSubmitButtonLabel(isPending, userId)}
        </Button>
      </div>
    </form>
  );
};

export default UserForm;
