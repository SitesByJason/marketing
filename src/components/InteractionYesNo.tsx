import LibButton from "@/library/Button";

type props = {
  onYes: () => void;
  onNo: () => void;
};

const InteractionYesNo: React.FC<props> = ({ onYes, onNo }) => {
  return (
    <div className="flex grow justify-around">
      <LibButton onClick={onNo} isOutlined={true} isSecondary={true}>
        No
      </LibButton>
      <LibButton onClick={onYes} isOutlined={true} isSecondary={true}>
        Yes
      </LibButton>
    </div>
  );
};

export default InteractionYesNo;
