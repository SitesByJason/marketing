import ConversationContext from "@/state/conversation.context";
import { useContext } from "react";
import InteractionYesNo from "../InteractionYesNo";

const RealEstateInvestorInteraction: React.FC = () => {
  const { sayYesToRealEstateInvestor, sayNoToRealEstateInvestor } =
    useContext(ConversationContext);

  return (
    <InteractionYesNo
      onYes={sayYesToRealEstateInvestor}
      onNo={sayNoToRealEstateInvestor}
    />
  );
};

export default RealEstateInvestorInteraction;
