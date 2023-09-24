import ConversationContext from "@/state/conversation.context";
import { useContext } from "react";
import InteractionYesNo from "../InteractionYesNo";

const UpdatesInteraction: React.FC = () => {
  const { sayYesToUpdates, sayNoToUpdates } = useContext(ConversationContext);

  return <InteractionYesNo onYes={sayYesToUpdates} onNo={sayNoToUpdates} />;
};

export default UpdatesInteraction;
