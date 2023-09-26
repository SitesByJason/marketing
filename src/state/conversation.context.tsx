import api from "@/api";
import { PotentialBusinessTypes } from "@/data/potential-business-types.const";
import { InteractionsEnum } from "@/enums/interactions.enum";
import { IMessage } from "@/interfaces/message.interface";
import { IUser } from "@/interfaces/user.interface";
import { FC, createContext, useState } from "react";
var pluralize = require("pluralize");

const jasonsTypingSpeedInSeconds = 48;

type context = {
  CurrentInteraction: InteractionsEnum | null;
  Messages: IMessage[];
  MessageCount: number;
  FirstName: string;
  LastName: string;
  Email: string;
  BusinessType: string;
  HasNotLearnedAboutPricing: boolean;
  HasNotLearnedAboutHowItllWork: boolean;
  HasNotLearnedAboutMe: boolean;
  saveConversation: () => void;
  resetConversation: () => void;
  giveName: (firstName: string, lastName: string) => void;
  sayYesToUpdates: () => void;
  sayNoToUpdates: () => void;
  giveEmailAddress: (emailAddress: string) => void;
  sayYesToRealEstateInvestor: () => void;
  sayNoToRealEstateInvestor: () => void;
  giveBusinessType: (businessType: string) => void;
  sayYesToInfo: () => void;
  sayNoToInfo: () => void;
  learnAboutPricing: () => void;
  learnAboutHowItllWork: () => void;
  learnAboutMe: () => void;
  sayNoToAnythingElse: () => void;
};

type props = {
  children: any;
};

/**
 * ----------------------------------
 * Context Object
 * ----------------------------------
 */
const ConversationContext = createContext<context>({
  CurrentInteraction: null,
  Messages: [],
  MessageCount: 0,
  FirstName: "",
  LastName: "",
  Email: "",
  BusinessType: "",
  HasNotLearnedAboutPricing: true,
  HasNotLearnedAboutHowItllWork: true,
  HasNotLearnedAboutMe: true,
  saveConversation: () => {},
  resetConversation: () => {},
  giveName: () => {},
  sayYesToUpdates: () => {},
  sayNoToUpdates: () => {},
  giveEmailAddress: () => {},
  sayYesToRealEstateInvestor: () => {},
  sayNoToRealEstateInvestor: () => {},
  giveBusinessType: () => {},
  sayYesToInfo: () => {},
  sayNoToInfo: () => {},
  learnAboutPricing: () => {},
  learnAboutHowItllWork: () => {},
  learnAboutMe: () => {},
  sayNoToAnythingElse: () => {},
});

export const ConversationContextProvider: FC<props> = ({ children }) => {
  /**
   * ----------------------------------
   * Initial Values
   * ----------------------------------
   */
  const firstMessage = {
    content: "Howdy, can start by getting your name?",
    isJason: true,
  };
  const firstInteraction = InteractionsEnum.Name;

  const [CurrentInteraction, setCurrentInteraction] = useState<number | null>(
    firstInteraction
  );

  const [Messages, setMessages] = useState<IMessage[]>([firstMessage]);
  const [MessageCount, setMessageCount] = useState<number>(0);

  const [FirstName, setFirstName] = useState<string>("");
  const [LastName, setLastName] = useState<string>("");
  const [Email, setEmail] = useState<string>("");
  const [BusinessType, setBusinessType] = useState<string>("");

  const [User, setUser] = useState<IUser>({
    first_name: "",
    last_name: "",
    email_address: "",
  });

  const [HasStartedLearning, setHasStartedLearning] = useState<boolean>(false);

  const [HasNotLearnedAboutPricing, setHasNotLearnedAboutPricing] =
    useState<boolean>(true);
  const [HasNotLearnedAboutHowItllWork, setHasNotLearnedAboutHowItllWork] =
    useState<boolean>(true);
  const [HasNotLearnedAboutMe, setHasNotLearnedAboutMe] =
    useState<boolean>(true);

  function resetConversation() {
    setCurrentInteraction(firstInteraction);
    setMessages([firstMessage]);
    setMessageCount(0);
    setFirstName("");
    setLastName("");
    setEmail("");
    setBusinessType("");
  }

  /**
   * ----------------------------------
   * Internal Functions
   * ----------------------------------
   */

  // Add message to beginning of array so it displays properly
  function addMessage(content: string, isJason: boolean) {
    setMessages((prevMessages) => {
      const Messages = [...prevMessages];
      Messages.unshift({ content: content, isJason: isJason });
      return Messages;
    });
    setMessageCount((prevCount) => {
      return prevCount + 1;
    });
  }

  // this is so I can remove the '...' typing Messages
  function removeLastMessage() {
    setMessages((prevMessages) => {
      const Messages = [...prevMessages];
      Messages.shift();
      return Messages;
    });
  }

  // Add a typing indicator when replying as Jason
  function addMessageJason(content: string, nextStep?: () => void) {
    addMessage("...", true);

    const chars = content.length;
    const typingTimeInSeconds = chars / jasonsTypingSpeedInSeconds;

    window.setTimeout(() => {
      removeLastMessage();
      addMessage(content, true);

      if (nextStep) nextStep();
    }, typingTimeInSeconds * 1000);
  }

  // Just a helper function
  function addMessageVisitor(content: string) {
    addMessage(content, false);
  }

  // See if their business is on our list
  function checkPotentialBusinessTypes(businessType: string) {
    return PotentialBusinessTypes.includes(businessType.toLowerCase());
  }

  /**
   * ----------------------------------
   * API Functions
   * ----------------------------------
   */
  function saveUser(firstName: string, lastName: string) {
    const user: IUser = {
      first_name: firstName,
      last_name: lastName,
    };

    api.users.store(user).then((response) => {
      setUser(response.data.data);
    });
  }

  function updateUser(businessType: string | null, email: string | null) {
    const user = User;

    if (user && user.id) {
      if (email) user.email_address = email;
      if (businessType) user.business_type = businessType;

      api.users.update(user);
    } else {
      const user: IUser = {
        first_name: FirstName,
        last_name: LastName,
        email_address: email || Email,
        business_type: businessType || BusinessType,
      };

      api.users.store(user).then((response) => {
        setUser(response.data.data);
      });
    }
  }

  function saveConversation() {
    if (User && User.id) {
      api.conversations.store({ user_id: User.id, messages: Messages });
    }
  }

  /**
   * ----------------------------------
   * Conversation Steps
   * ----------------------------------
   */

  function giveName(firstName: string, lastName: string) {
    setCurrentInteraction(null);
    setFirstName(firstName);
    setLastName(lastName);

    saveUser(firstName, lastName);

    addMessageVisitor(`My name is ${firstName} ${lastName}`);

    addMessageJason(
      `It's nice to meet you ${firstName}`,
      askIfRealEstateInvestor
    );
  }

  function askIfRealEstateInvestor() {
    setCurrentInteraction(null);

    addMessageJason(
      "Are you by chance a Real Estate Investor?",
      setCurrentInteraction.bind("", InteractionsEnum.RealEstateInvestor)
    );
  }

  function sayYesToRealEstateInvestor() {
    setCurrentInteraction(null);

    addMessageVisitor("Yes, I am a Real Estate Investor");

    updateUser("Real Estate Investor", null);

    // They've already given email address
    if (Email.length) {
      addMessageJason(
        "Great, I'd love to build your next site",
        askIfTheyWantInfo
      );
    } else {
      addMessageJason(
        "Great, I'd love to build your next site. Would you like me to update you when I'm ready?",
        setCurrentInteraction.bind("", InteractionsEnum.Updates)
      );
    }
  }

  function sayNoToRealEstateInvestor() {
    setCurrentInteraction(null);

    addMessageVisitor("Nope");

    addMessageJason(
      "No worries, what type of business do you own?",
      setCurrentInteraction.bind("", InteractionsEnum.BusinessType)
    );
  }

  function giveBusinessType(businessType: string) {
    setCurrentInteraction(null);
    setBusinessType(businessType);

    addMessageVisitor(`${businessType}`);

    updateUser(businessType, null);

    // Their business type is on the list
    if (checkPotentialBusinessTypes(businessType)) {
      // They've already given email address
      if (Email.length) {
        addMessageJason(
          `${pluralize(
            businessType
          )} are on my list of potential sites! <br>I'll send you an email when I start building them.`,
          askIfTheyWantInfo
        );
      }
      // They didn't give email address so check again
      else {
        addMessageJason(
          `${pluralize(
            businessType
          )} are on my list of potential sites. <br> Would you like me to update you when I building them?`,
          setCurrentInteraction.bind("", InteractionsEnum.Updates)
        );
      }
    }
    // Their business type is not on the list
    else {
      // They've already given email address
      if (Email.length) {
        addMessageJason(
          `${pluralize(
            businessType
          )} aren't on my current list of sites to build, but I'll look into it`,
          askIfTheyWantInfo
        );
      }
      // They didn't give email address so check again
      else {
        addMessageJason(
          `${pluralize(
            businessType
          )} aren't on my current list of sites to build, but I'll look into it. <br>Would you like me to update you?`,
          setCurrentInteraction.bind("", InteractionsEnum.Updates)
        );
      }
    }
  }

  function sayYesToUpdates() {
    setCurrentInteraction(null);

    addMessageVisitor("Yes, I would");

    askForEmailAddress();
  }

  function sayNoToUpdates() {
    setCurrentInteraction(null);

    addMessageVisitor("No Thanks");

    if (HasStartedLearning) {
      addMessageJason("No problem", endConversation);
    } else {
      addMessageJason("No worries", askIfTheyWantInfo);
    }
  }

  function askForEmailAddress() {
    addMessageJason(
      "Awesome, I just need your email address",
      addMessageJason.bind(
        "",
        "BTW I'll keep this to myself and promise not to bother you too much",
        setCurrentInteraction.bind("", InteractionsEnum.Email)
      )
    );
  }

  function giveEmailAddress(emailAddress: string) {
    setCurrentInteraction(null);
    setEmail(emailAddress);

    addMessageVisitor(`My email address is ${emailAddress}`);

    updateUser(null, emailAddress);

    const message = "Thanks for giving me your email";

    if (HasStartedLearning) {
      addMessageJason(message, endConversation);
    } else {
      addMessageJason(message, askIfTheyWantInfo);
    }
  }

  function askIfTheyWantInfo() {
    setHasStartedLearning(true);

    addMessageJason(
      "Would you like to know anything about me?",
      setCurrentInteraction.bind("", InteractionsEnum.MoreInfo)
    );
  }

  function sayYesToInfo() {
    setCurrentInteraction(null);

    addMessageVisitor("Yeah I have some questions");

    addMessageJason(
      "What can I answer for you?",
      setCurrentInteraction.bind("", InteractionsEnum.Learn)
    );
  }

  function sayNoToInfo() {
    setCurrentInteraction(null);

    addMessageVisitor("Not Really");

    if (!Email.length) {
      askForEmailAddressAgain();
    } else {
      endConversation();
    }
  }

  function learnAboutPricing() {
    setCurrentInteraction(null);
    setHasNotLearnedAboutPricing(false);

    addMessageVisitor("I'd like to know about pricing");

    addMessageJason(
      "I don't have my pricing fully worked out yet",
      addMessageJason.bind(
        "",
        "But it'll probably be around $30/mo give or take",
        askWhatElse
          .bind("learnedAboutPricing", true)
          .bind("learnedAboutHowItllWork", !HasNotLearnedAboutHowItllWork)
          .bind("learnedAboutMe", !HasNotLearnedAboutMe)
      )
    );
  }

  function learnAboutHowItllWork() {
    setCurrentInteraction(null);
    setHasNotLearnedAboutHowItllWork(false);

    addMessageVisitor("How will it work?");

    addMessageJason(
      "We'll have a brief conversation about your business and discuss some details for your website",
      addMessageJason.bind(
        "",
        "Then I'll take care of everything from there",
        addMessageJason.bind(
          "",
          "Including writing content, choosing images, and hosting the website.",
          askWhatElse
            .bind("learnedAboutPricing", !HasNotLearnedAboutPricing)
            .bind("learnedAboutHowItllWork", true)
            .bind("learnedAboutMe", !HasNotLearnedAboutMe)
        )
      )
    );
  }

  function learnAboutMe() {
    setCurrentInteraction(null);
    setHasNotLearnedAboutMe(false);

    addMessageVisitor("What does it mean to be an artifical developer?");

    addMessageJason(
      "I'm really just a program. So I'm not a real boy :(",
      addMessageJason.bind(
        "",
        "Instead I use Artificial Intelligence to build and manage your site.",
        askWhatElse
          .bind("learnedAboutPricing", !HasNotLearnedAboutPricing)
          .bind("learnedAboutHowItllWork", !HasNotLearnedAboutHowItllWork)
          .bind("learnedAboutMe", true)
      )
    );
  }

  function askWhatElse(
    learnedAboutPricing: boolean,
    learnedAboutHowItllWork: boolean,
    learnedAboutMe: boolean
  ) {
    let continueLearning = true;

    if (learnedAboutPricing && learnedAboutHowItllWork && learnedAboutMe) {
      continueLearning = false;
    }

    if (continueLearning) {
      addMessageJason(
        "Would you like to know about anything else?",
        setCurrentInteraction.bind("", InteractionsEnum.Learn)
      );
    } else {
      addMessageVisitor("That's all of my questions");

      if (!Email.length) {
        askForEmailAddressAgain();
      } else {
        endConversation();
      }
    }
  }

  function sayNoToAnythingElse() {
    setCurrentInteraction(null);

    addMessageVisitor("No thanks I'm good");

    if (!Email.length) {
      askForEmailAddressAgain();
    } else {
      endConversation();
    }
  }

  function askForEmailAddressAgain() {
    addMessageJason(
      `Before you go would you like to receive updates?`,
      setCurrentInteraction.bind("", InteractionsEnum.Updates)
    );
  }

  function endConversation() {
    addMessageJason(
      "It's been great chatting with you. I hope you have an outstanding day!",
      setCurrentInteraction.bind("", InteractionsEnum.End)
    );
  }

  /**
   * ----------------------------------
   * Context Provider
   * ----------------------------------
   */

  const context = {
    CurrentInteraction,
    Messages,
    MessageCount,
    FirstName,
    LastName,
    Email,
    BusinessType,
    HasNotLearnedAboutPricing,
    HasNotLearnedAboutHowItllWork,
    HasNotLearnedAboutMe,
    saveConversation,
    resetConversation,
    giveName,
    sayYesToUpdates,
    sayNoToUpdates,
    giveEmailAddress,
    sayYesToRealEstateInvestor,
    sayNoToRealEstateInvestor,
    giveBusinessType,
    sayYesToInfo,
    sayNoToInfo,
    learnAboutPricing,
    learnAboutHowItllWork,
    learnAboutMe,
    sayNoToAnythingElse,
  };

  return (
    <ConversationContext.Provider value={context}>
      {children}
    </ConversationContext.Provider>
  );
};

export default ConversationContext;
