import ConversationsAPI from "@/api/conversations.api";
import LibButton from "@/library/Button";
import ConversationContext from "@/state/conversation.context";
import ModalContext from "@/state/modal.context";
import { useContext } from "react";

const EndInteraction: React.FC = () => {
  const { resetConversation, UserId, Messages } =
    useContext(ConversationContext);
  const { closeModal } = useContext(ModalContext);

  function closeConversation() {
    ConversationsAPI.store(UserId, Messages);
    resetConversation();
    closeModal();
  }

  return (
    <div className="flex grow justify-end">
      <LibButton onClick={closeConversation} isSecondary={true}>
        Close Conversation
      </LibButton>
    </div>
  );
};

export default EndInteraction;
