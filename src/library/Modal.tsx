import { createPortal } from "react-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useContext } from "react";
import ModalContext from "@/state/modal.context";

type props = {
  children: any;
  heading?: string;
  showHeader?: boolean;
  closeOnBackdropClick?: boolean;
};

const LibModal: React.FC<props> = ({
  children,
  heading,
  showHeader = true,
  closeOnBackdropClick = true,
}) => {
  const modalContext = useContext(ModalContext);

  function closeModal(close = false) {
    if (close) {
      modalContext.closeModal();
    }
  }

  return modalContext.isOpen
    ? createPortal(
        <div className="fixed inset-0 flex justify-center items-center">
          <div
            className="absolute inset-0 z-30 bg-slate-900 opacity-70"
            onClick={closeModal.bind("close", closeOnBackdropClick)}
          ></div>

          <div className="z-50 w-[90%] max-w-md h-[90%] md:h-4/5 flex flex-col bg-white rounded-lg">
            <div className="py-1 border-b border-slate-200">
              {showHeader && (
                <div className="flex justify-between items-center">
                  <h3 className="px-2 text-xl font-bold">{heading}</h3>
                  <div
                    className="p-2 text-slate-500 hover:text-secondary cursor-pointer"
                    onClick={closeModal.bind("close", true)}
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </div>
                </div>
              )}
            </div>

            <div className="grow overflow-y-auto font-sans">{children}</div>

            <div className="py-1 border-t border-slate-200"></div>
          </div>
        </div>,
        document.getElementById("modal")!
      )
    : null;
};

export default LibModal;
