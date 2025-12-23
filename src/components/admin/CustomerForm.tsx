import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  useCreateCustomer,
  useUpdateCustomer,
  useCustomer,
} from "@/hooks/useCustomers";
import { applyPhoneMask, removePhoneMask } from "@/utils/phoneMask";
import { CreateCustomersDto, UpdateCustomersDto } from "@/types/customers.dto";
import PhoneField from "@/components/forms/PhoneField";
import NameField from "@/components/forms/NameField";
import EmailField from "@/components/forms/EmailField";
import DocumentField from "@/components/forms/DocumentField";
import {
  customerSchema,
  type CustomerFormData,
} from "@/schemas/customer.schema";
import { getSubmitButtonLabel } from "@/utils/formUtils";
import { useToast } from "@/hooks/useToast";
import { register as registerUser } from "@/services/auth.service";
import { UserTypeEnum } from "@/types/enums";
import { applyCpfMask, removeCpfMask } from "@/utils/cpfMask";
import { applyCnpjMask, removeCnpjMask } from "@/utils/cnpjMask";

interface CustomerFormProps {
  customerId?: string;
  onSuccess: () => void;
  onCancel: () => void;
}

const CustomerForm = ({
  customerId,
  onSuccess,
  onCancel,
}: CustomerFormProps) => {
  const { data: customer } = useCustomer(customerId);
  const { mutate: createCustomer, isPending: isCreating } = useCreateCustomer();
  const { mutate: updateCustomer, isPending: isUpdating } = useUpdateCustomer();
  const { toast } = useToast();

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<CustomerFormData>({
    resolver: zodResolver(customerSchema),
  });

  useEffect(() => {
    if (customer) {
      reset({
        name: customer.userName ?? "",
        email: customer.userEmail ?? "",
        phoneNumber: customer.phoneNumber
          ? applyPhoneMask(customer.phoneNumber)
          : "",
        document: customer.document
          ? customer.document.length === 11
            ? applyCpfMask(customer.document)
            : customer.document.length === 14
            ? applyCnpjMask(customer.document)
            : customer.document
          : "",
      });
    }
  }, [customer, reset]);

  const onSubmit = async (data: CustomerFormData) => {
    if (customerId) {
      const updateData: UpdateCustomersDto = {
        name: data.name,
        email: data.email,
        phoneNumber: data.phoneNumber
          ? removePhoneMask(data.phoneNumber)
          : undefined,
        document: data.document
          ? data.document.length === 14
            ? removeCpfMask(data.document)
            : data.document.length === 18
            ? removeCnpjMask(data.document)
            : data.document
          : undefined,
      };
      updateCustomer({ uuid: customerId, data: updateData }, { onSuccess });
    } else {
      try {
        const createData: CreateCustomersDto = {
          name: data.name,
          email: data.email,
          phoneNumber: data.phoneNumber
            ? removePhoneMask(data.phoneNumber)
            : undefined,
          document: data.document
            ? data.document.length === 14
              ? removeCpfMask(data.document)
              : data.document.length === 18
              ? removeCnpjMask(data.document)
              : data.document
            : undefined,
        };
        createCustomer(createData, { onSuccess });
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Não foi possível criar o cliente";
        toast({
          title: "Erro ao criar cliente",
          description: errorMessage,
          variant: "destructive",
        });
      }
    }
  };

  const isPending = isCreating || isUpdating;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <NameField
          control={control}
          name="name"
          label="Nome Completo"
          placeholder="Nome completo do cliente"
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

        <PhoneField
          control={control}
          name="phoneNumber"
          label="Telefone"
          error={errors.phoneNumber?.message}
          disabled={isPending}
          required={false}
        />

        <DocumentField
          control={control}
          name="document"
          label="Documento (CPF/CNPJ)"
          error={errors.document?.message}
          disabled={isPending}
          required={false}
        />
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
          {getSubmitButtonLabel(isPending, customerId)}
        </Button>
      </div>
    </form>
  );
};

export default CustomerForm;
