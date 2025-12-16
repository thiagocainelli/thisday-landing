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
import { removePhoneMask } from "@/utils/phoneMask";
import { CreateCustomerDto, UpdateCustomerDto } from "@/types/customers.dto";
import NameField from "@/components/forms/NameField";
import EmailField from "@/components/forms/EmailField";
import PhoneField from "@/components/forms/PhoneField";
import FormFieldWrapper from "@/components/forms/FormFieldWrapper";
import {
  customerSchema,
  type CustomerFormData,
} from "@/schemas/customer.schema";
import { getSubmitButtonLabel } from "@/utils/formUtils";

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
        fullName: customer.fullName,
        email: customer.email,
        phone: customer.phone,
        document: customer.document,
      });
    }
  }, [customer, reset]);

  const onSubmit = (data: CustomerFormData) => {
    if (customerId) {
      const updateData: UpdateCustomerDto = {
        id: customerId,
        fullName: data.fullName,
        email: data.email,
        phone: removePhoneMask(data.phone),
        document: data.document,
      };
      updateCustomer(updateData, { onSuccess });
    } else {
      const createData: CreateCustomerDto = {
        fullName: data.fullName,
        email: data.email,
        phone: removePhoneMask(data.phone),
        document: data.document,
      };
      createCustomer(createData, { onSuccess });
    }
  };

  const isPending = isCreating || isUpdating;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <NameField
          control={control}
          name="fullName"
          label="Nome Completo"
          placeholder="Nome completo do cliente"
          error={errors.fullName?.message}
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
          name="phone"
          label="Telefone"
          error={errors.phone?.message}
          disabled={isPending}
          required={true}
        />

        <FormFieldWrapper
          label="Documento (CPF/CNPJ)"
          htmlFor="document"
          required={false}
        >
          <Input id="document" {...register("document")} disabled={isPending} />
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
          {getSubmitButtonLabel(isPending, customerId)}
        </Button>
      </div>
    </form>
  );
};

export default CustomerForm;
