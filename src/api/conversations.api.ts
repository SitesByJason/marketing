import IConversation from "@/interfaces/conversation.interface";
import axios from "axios";

function store(conversation: IConversation) {
  const messagesReversed = Array(conversation.messages).reverse();
  conversation.messages = JSON.stringify(messagesReversed);

  return axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/conversations`,
    conversation
  );
}

const ConversationsAPI = {
  store,
};

export default ConversationsAPI;
