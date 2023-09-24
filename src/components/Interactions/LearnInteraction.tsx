import LibButton from "@/library/Button";
import ConversationContext from "@/state/conversation.context";
import { useContext } from "react";

const LearnInteraction: React.FC = () => {
  const {
    learnAboutPricing,
    learnAboutHowItllWork,
    learnAboutMe,
    sayNoToAnythingElse,
    HasNotLearnedAboutPricing,
    HasNotLearnedAboutHowItllWork,
    HasNotLearnedAboutMe,
  } = useContext(ConversationContext);

  const showNotReallyButton =
    !HasNotLearnedAboutPricing ||
    !HasNotLearnedAboutHowItllWork ||
    !HasNotLearnedAboutMe;

  return (
    <div className="flex grow flex-wrap justify-around">
      {HasNotLearnedAboutPricing && (
        <LibButton
          onClick={learnAboutPricing}
          isOutlined={true}
          isSecondary={true}
        >
          Pricing
        </LibButton>
      )}

      {HasNotLearnedAboutHowItllWork && (
        <LibButton
          onClick={learnAboutHowItllWork}
          isOutlined={true}
          isSecondary={true}
        >
          How It'll Work
        </LibButton>
      )}

      {HasNotLearnedAboutMe && (
        <LibButton onClick={learnAboutMe} isOutlined={true} isSecondary={true}>
          About Me
        </LibButton>
      )}

      {showNotReallyButton && (
        <LibButton
          onClick={sayNoToAnythingElse}
          isOutlined={true}
          isSecondary={true}
        >
          Not Really
        </LibButton>
      )}
    </div>
  );
};

export default LearnInteraction;
