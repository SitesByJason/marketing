import { FC, createContext, useState } from "react";

const ModalContext = createContext({
  isOpen: false,
  openModal: function () {},
  closeModal: function () {},
});

type props = {
  children: any;
};

export const ModalContextProvider: FC<props> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const context = {
    isOpen,
    openModal,
    closeModal,
  };

  return (
    <ModalContext.Provider value={context}>{children}</ModalContext.Provider>
  );
};

export default ModalContext;
