import ConversationContext from "@/state/conversation.context";
import { useContext } from "react";
import InteractionYesNo from "../InteractionYesNo";

const MoreInfoInteraction: React.FC = () => {
  const { sayYesToInfo, sayNoToInfo } = useContext(ConversationContext);

  return <InteractionYesNo onYes={sayYesToInfo} onNo={sayNoToInfo} />;
};

export default MoreInfoInteraction;
