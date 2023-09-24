import LibInput from "@/library/Input";
import ConversationContext from "@/state/conversation.context";
import { useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import InteractionForm from "../InteractionForm";

const NameInteraction: React.FC = () => {
  const { giveName } = useContext(ConversationContext);

  type FormValues = {
    firstName: string;
    lastName: string;
  };

  const defaultValues = {
    firstName: "",
    lastName: "",
  };

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ defaultValues: defaultValues });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    giveName(data.firstName, data.lastName);
    reset(defaultValues);
  };

  return (
    <InteractionForm onSubmit={handleSubmit(onSubmit)}>
      <LibInput
        name="firstName"
        placeholder="First Name"
        control={control}
        rules={{ required: "First name is required" }}
        error={errors.firstName}
      />

      <LibInput
        name="lastName"
        placeholder="Last Name"
        control={control}
        rules={{ required: "Last name is required" }}
        error={errors.lastName}
      />
    </InteractionForm>
  );
};

export default NameInteraction;
