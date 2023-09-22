import LibContainer from "@/library/Container";
import Image from "next/image";

const PageHeader: React.FC = () => {
  return (
    <LibContainer className="flex justify-center py-6">
      <div className="flex items-center">
        <Image
          src="/images/avatars/jason-avatar-yay.png"
          alt="Jason"
          width={48}
          height={48}
        />
        <p className="ml-4 text-4xl font-logo font-bold text-secondary">
          <span className="text-primary">Sites</span>By
          <span className="text-primary">Jason</span>
        </p>
      </div>
    </LibContainer>
  );
};

export default PageHeader;
