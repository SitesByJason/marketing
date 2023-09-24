import LibButton from "@/library/Button";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";

type props = {
  children: any;
  onSubmit: () => {};
};

const InteractionForm: React.FC<props> = ({ children, onSubmit }) => {
  return (
    <form className="flex grow items-center space-x-4" onSubmit={onSubmit}>
      {children}

      <LibButton isIcon={true} type="submit">
        <PaperAirplaneIcon className="h-6 w-6 text-secondary" />
      </LibButton>
    </form>
  );
};

export default InteractionForm;
