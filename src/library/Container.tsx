type props = {
  children: any;
  className?: string;
};

const LibContainer: React.FC<props> = ({ children, className }) => {
  return (
    <div className={`max-w-2xl mx-auto px-6 bg-white ${className}`}>
      {children}
    </div>
  );
};

export default LibContainer;
