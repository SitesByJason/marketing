import LibInput from "@/library/Input";
import ConversationContext from "@/state/conversation.context";
import { useContext } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import InteractionForm from "../InteractionForm";

const EmailInteraction: React.FC = () => {
  const { giveEmailAddress } = useContext(ConversationContext);

  type FormValues = {
    emailAddress: string;
  };

  const defaultValues = {
    emailAddress: "",
  };

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ defaultValues: defaultValues });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    giveEmailAddress(data.emailAddress);
    reset(defaultValues);
  };

  return (
    <InteractionForm onSubmit={handleSubmit(onSubmit)}>
      <LibInput
        name="emailAddress"
        placeholder="Email Address"
        control={control}
        rules={{ required: "Email Address is required" }}
        error={errors.emailAddress}
      />
    </InteractionForm>
  );
};

export default EmailInteraction;
