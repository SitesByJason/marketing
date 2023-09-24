import UsersAPI from "@/api/users.api";
import { PotentialBusinessTypes } from "@/data/potential-business-types.const";
import { InteractionsEnum } from "@/enums/interactions.enum";
import { IMessage } from "@/interfaces/message.interface";
import { FC, createContext, useState } from "react";
var pluralize = require("pluralize");

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
  UserId: number;
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
  UserId: 1,
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
    content: "Howdy, can I get your first and last name?",
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
  const [HasNotLearnedAboutPricing, setHasNotLearnedAboutPricing] =
    useState<boolean>(true);
  const [HasNotLearnedAboutHowItllWork, setHasNotLearnedAboutHowItllWork] =
    useState<boolean>(true);
  const [HasNotLearnedAboutMe, setHasNotLearnedAboutMe] =
    useState<boolean>(true);
  const [UserId, setUserId] = useState<number>(1);

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
    const typingTimeInSeconds = chars / 35; // chars/second

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
  function saveUser(firstName: string, lastName: string, email: string) {
    UsersAPI.store(firstName, lastName, email).then((response) => {
      setUserId(response.data.data.id);
    });
  }

  function updateUser(businessType: string) {
    UsersAPI.update(UserId, businessType);
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

    addMessageVisitor(`My name is ${firstName} ${lastName}`);

    addMessageJason(`It's nice to meet you ${firstName}`, askAboutUpdates);
  }

  function askAboutUpdates() {
    addMessageJason(
      "Would you like to receive updates about SitesByJason?",
      setCurrentInteraction.bind("", InteractionsEnum.Updates)
    );
  }

  function sayYesToUpdates() {
    setCurrentInteraction(null);

    addMessageVisitor("Yes, I Would");

    askForEmailAddress();
  }

  function sayNoToUpdates() {
    setCurrentInteraction(null);

    addMessageVisitor("No Thanks");

    // This is the first time they said no to updates
    if (!BusinessType) {
      addMessageJason(
        "No worries, you can always check back here in the future to see my progress.",
        askIfRealEstateInvestor
      );
    }
    // This is the second time they said no to updates
    else {
      addMessageJason("No worries, I understand.", askIfTheyWantInfo);
    }
  }

  function askForEmailAddress() {
    addMessageJason(
      "Awesome, I just need your email address.",
      setCurrentInteraction.bind("", InteractionsEnum.Email)
    );
  }

  function giveEmailAddress(emailAddress: string) {
    setCurrentInteraction(null);
    setEmail(emailAddress);

    addMessageVisitor(`My email address is ${emailAddress}`);

    saveUser(FirstName, LastName, emailAddress);

    addMessageJason(
      "Thanks for your email address, I'll keep it to myself. <br>No SPAM here.",
      !!BusinessType ? askIfTheyWantInfo : askIfRealEstateInvestor
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

    updateUser("Real Estate Investor");

    addMessageJason(
      "Great, then you'll be perfectly suited for one of my sites.",
      askIfTheyWantInfo
    );
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

    addMessageVisitor(`I own a ${businessType}`);

    updateUser(businessType);

    // Their business type is on the list
    if (checkPotentialBusinessTypes(businessType)) {
      // They've already given email address
      if (Email.length) {
        addMessageJason(
          `${pluralize(
            businessType
          )} are on my list of potential sites! <br>I'll send you an email when I start working on it and see if you want to be part of the early testing group.`,
          askIfTheyWantInfo
        );
      }
      // They didn't give email address so check again
      else {
        addMessageJason(
          `${pluralize(
            businessType
          )} is on my list of potential sites. Would you like me to update you when I start working on it?`,
          setCurrentInteraction.bind("", InteractionsEnum.Updates)
        );
      }
    }
    // Their business type is not on the list
    else {
      addMessageJason(
        `${pluralize(
          businessType
        )} aren't on my current list of sites to build, but I'll look into it.`,
        askIfTheyWantInfo
      );
    }
  }

  function askIfTheyWantInfo() {
    addMessageJason(
      "That's all the questions I have. Would you like to know anything about me?",
      setCurrentInteraction.bind("", InteractionsEnum.MoreInfo)
    );
  }

  function sayYesToInfo() {
    setCurrentInteraction(null);

    addMessageVisitor("Yes I Would");

    addMessageJason(
      "Great, what would you like to know about?",
      setCurrentInteraction.bind("", InteractionsEnum.Learn)
    );
  }

  function sayNoToInfo() {
    setCurrentInteraction(null);

    addMessageVisitor("Not Really");

    endConversation();
  }

  function learnAboutPricing() {
    setCurrentInteraction(null);
    setHasNotLearnedAboutPricing(false);

    addMessageVisitor("I'd like to know about pricing.");

    addMessageJason(
      "I don't have pricing fully worked out yet",
      addMessageJason.bind(
        "",
        "But it'll probably be around $30/mo give or take.",
        addMessageJason.bind(
          "",
          "I might also have some add ons in the future for an additional cost",
          askWhatElse
            .bind("learnedAboutPricing", true)
            .bind("learnedAboutHowItllWork", !HasNotLearnedAboutHowItllWork)
            .bind("learnedAboutMe", !HasNotLearnedAboutMe)
        )
      )
    );
  }

  function learnAboutHowItllWork() {
    setCurrentInteraction(null);
    setHasNotLearnedAboutHowItllWork(false);

    addMessageVisitor("How will it work?");

    addMessageJason(
      "I need some information about your business.",
      addMessageJason.bind(
        "",
        "Then I'll create a website that comes with all the content, images, and settings all ready to go.",
        addMessageJason.bind(
          "",
          "Of course you'll have the option to edit the website yourself afterwards.",
          addMessageJason.bind(
            "",
            "Finally I'll host the website and make sure it's always ready for your visitors.",
            askWhatElse
              .bind("learnedAboutPricing", !HasNotLearnedAboutPricing)
              .bind("learnedAboutHowItllWork", true)
              .bind("learnedAboutMe", !HasNotLearnedAboutMe)
          )
        )
      )
    );
  }

  function learnAboutMe() {
    setCurrentInteraction(null);
    setHasNotLearnedAboutMe(false);

    addMessageVisitor("What does it mean to be an artifical developer?");

    addMessageJason(
      "I'm really just a program. So not a real boy :(",
      addMessageJason.bind(
        "",
        "But I do use Artificial Intelligence so I will be able to do a lot of cool things.",
        addMessageJason.bind(
          "",
          "Like write content and choose images for your site.",
          addMessageJason.bind(
            "",
            "And manage all the details of your site so you don't have to.",
            askWhatElse
              .bind("learnedAboutPricing", !HasNotLearnedAboutPricing)
              .bind("learnedAboutHowItllWork", !HasNotLearnedAboutHowItllWork)
              .bind("learnedAboutMe", true)
          )
        )
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
        "Would you like to know about else?",
        setCurrentInteraction.bind("", InteractionsEnum.Learn)
      );
    } else {
      endConversation();
    }
  }

  function sayNoToAnythingElse() {
    setCurrentInteraction(null);

    addMessageVisitor("No Thanks");

    endConversation();
  }

  function endConversation() {
    addMessageJason(
      "Well, that's it for now. I hope you have an outstanding day!",
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
    UserId,
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
