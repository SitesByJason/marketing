import { IMessage } from "@/interfaces/message.interface";
import axios from "axios";

function store(userId: number, messages: IMessage[]) {
  const messagesReversed = messages.reverse();
  const messagesJSON = JSON.stringify(messagesReversed);

  return axios.post(`${process.env.NEXT_PUBLIC_API_URL}/conversations`, {
    user_id: userId,
    messages: messagesJSON,
  });
}

const ConversationsAPI = {
  store,
};

export default ConversationsAPI;
