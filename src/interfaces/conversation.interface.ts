import { IMessage } from "./message.interface";

export default interface IConversation {
  user_id: number;
  messages: string | IMessage[];
}
