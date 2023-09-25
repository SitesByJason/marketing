import { IMessage } from "@/interfaces/message.interface";
import ConversationContext from "@/state/conversation.context";
import Image from "next/image";
import { useContext } from "react";

type props = {
  currentMessage: IMessage;
  messages: IMessage[];
  index: number;
};

const ConversationItem: React.FC<props> = ({
  currentMessage,
  messages,
  index,
}) => {
  const { FirstName, LastName } = useContext(ConversationContext);

  // Visitor Initials
  const firstInitial = FirstName.slice(0, 1).toUpperCase();
  const lastInitial = LastName.slice(0, 1).toUpperCase();
  const initials = `${firstInitial}${lastInitial}`;

  // Set message types
  const isJason = currentMessage.isJason;
  const isVisitor = !currentMessage.isJason;

  // See if message chain has similar previous or next messages
  const nextMessage = index > 0 ? messages[index - 1] : null;
  const previousMessage =
    messages.length > 1 && index < messages.length ? messages[index + 1] : null;

  const isPreviousSame = previousMessage
    ? previousMessage.isJason === currentMessage.isJason
    : false;
  const isNextSame = nextMessage
    ? nextMessage.isJason === currentMessage.isJason
    : false;

  // Set classes
  let rowClasses = "flex items-start";
  let messageClasses = "max-w-[67%] mx-1 p-3";

  if (isJason) {
    rowClasses += " justify-start";
    messageClasses += " bg-primary text-white";
  }

  if (isVisitor) {
    rowClasses += " justify-end";
    messageClasses += " bg-slate-300 text-text";
  }

  if (isPreviousSame) {
    rowClasses += " mt-1";
  } else {
    rowClasses += " mt-4";
  }

  if (isNextSame) {
    messageClasses += " rounded-t-lg";
  } else if (isPreviousSame) {
    messageClasses += " rounded-b-lg";
  } else {
    messageClasses += " rounded-lg";
  }

  return (
    <div className={rowClasses}>
      {/* Jason Avatar */}
      {isJason && (
        <div className="w-10">
          {!isPreviousSame && (
            <Image
              src="https://cdn.sitesbyjason.com/jason/avatars/yay.png"
              alt="Jason"
              width={36}
              height={36}
            />
          )}
        </div>
      )}

      {/* Message */}
      {/* It's okay to use dangerouslySetInnerHTML because the html is coming from the code, not users */}
      <div
        className={messageClasses}
        dangerouslySetInnerHTML={{ __html: currentMessage.content }}
      />

      {/* Visitor Avatar */}
      {isVisitor && (
        <div className="w-10 flex justify-end">
          <div className="w-9 h-9 flex justify-center items-center bg-secondary-light rounded-full">
            <p className="font-bold text-primary">{initials}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConversationItem;
