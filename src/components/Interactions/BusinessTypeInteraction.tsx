import LibInput from "@/library/Input";
import ConversationContext from "@/state/conversation.context";
import { useContext } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import InteractionForm from "../InteractionForm";

const BusinessTypeInteraction: React.FC = () => {
  const { giveBusinessType } = useContext(ConversationContext);

  type FormValues = {
    businessType: string;
  };

  const defaultValues = {
    businessType: "",
  };

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ defaultValues: defaultValues });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    giveBusinessType(data.businessType);
    reset(defaultValues);
  };

  return (
    <InteractionForm onSubmit={handleSubmit(onSubmit)}>
      <LibInput
        name="businessType"
        placeholder="Business Type"
        control={control}
        rules={{ required: "Business type is required" }}
        error={errors.businessType}
      />
    </InteractionForm>
  );
};

export default BusinessTypeInteraction;
