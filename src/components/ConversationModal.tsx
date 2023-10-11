import LibModal from "@/library/Modal";
import ConversationItem from "./ConversationItem";
import { useContext, useEffect, useRef } from "react";
import ConversationContext from "@/state/conversation.context";
import { InteractionsEnum } from "@/enums/interactions.enum";
import NameInteraction from "./Interactions/NameInteraction";
import EmailInteraction from "./Interactions/EmailInteraction";
import BusinessTypeInteraction from "./Interactions/BusinessTypeInteraction";
import LearnInteraction from "./Interactions/LearnInteraction";
import UpdatesInteraction from "./Interactions/UpdatesInteraction";
import RealEstateInvestorInteraction from "./Interactions/RealEstateInvestorInteraction";
import MoreInfoInteraction from "./Interactions/MoreInfoInteraction";
import EndInteraction from "./Interactions/EndInteraction";

const ConversationModal: React.FC = () => {
  const {
    saveConversation,
    resetConversation,
    Messages,
    MessageCount,
    CurrentInteraction,
  } = useContext(ConversationContext);

  let content = null;

  if (CurrentInteraction === InteractionsEnum.BusinessType) {
    content = <BusinessTypeInteraction />;
  }

  if (CurrentInteraction === InteractionsEnum.Email) {
    content = <EmailInteraction />;
  }

  if (CurrentInteraction === InteractionsEnum.End) {
    content = <EndInteraction />;
  }

  if (CurrentInteraction === InteractionsEnum.Learn) {
    content = <LearnInteraction />;
  }

  if (CurrentInteraction === InteractionsEnum.MoreInfo) {
    content = <MoreInfoInteraction />;
  }

  if (CurrentInteraction === InteractionsEnum.Name) {
    content = <NameInteraction />;
  }

  if (CurrentInteraction === InteractionsEnum.RealEstateInvestor) {
    content = <RealEstateInvestorInteraction />;
  }

  if (CurrentInteraction === InteractionsEnum.Updates) {
    content = <UpdatesInteraction />;
  }

  // This code keeps the message window scrolled to the bottom
  const bottom = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (MessageCount > 1) {
      bottom.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [MessageCount]);

  function onCloseModal() {
    saveConversation();
    resetConversation();
  }

  return (
    <LibModal heading="Let's Talk" footer={content} onClose={onCloseModal}>
      <div className="flex flex-col h-full">
        <div className="grow flex flex-col-reverse px-4 bg-gray-100">
          {/* This needs to be here because of the flex-col-reverse */}
          <div ref={bottom} className="h-4" />

          {Messages.map((message, index) => (
            <ConversationItem
              key={index}
              currentMessage={message}
              messages={Messages}
              index={index}
            />
          ))}
        </div>
      </div>
    </LibModal>
  );
};

export default ConversationModal;
