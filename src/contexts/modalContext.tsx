import { createContext, useContext, useState } from "react";
import { Modal } from "components/Atomic/Atoms/Modal";

export interface TModalProperties {
  title: string;
  content: React.ReactNode;
}

interface TModalContext {
  isOpen: boolean;
  closeModal: () => void;
  openModal: (properties: TModalProperties) => void;
}

const ModalContext = createContext<TModalContext>({
  isOpen: false,
  closeModal: () => null,
  openModal: () => null,
});

export const useModal = () => {
  const modalContext = useContext(ModalContext);
  return modalContext;
};

interface ModalProviderProps {
  children?: React.ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalProperties, setModalProperties] =
    useState<TModalProperties | null>(null);

  const openModal = (properties: TModalProperties) => {
    setModalProperties(properties);
    setIsOpen(true);
  };

  const closeModal = () => {
    setModalProperties(null);
    setIsOpen(false);
  };

  return (
    <ModalContext.Provider
      value={{
        isOpen,
        closeModal,
        openModal,
      }}
    >
      <Modal
        title={modalProperties?.title}
        isOpen={isOpen}
        closeModal={closeModal}
      >
        {modalProperties?.content}
      </Modal>
      {children}
    </ModalContext.Provider>
  );
};
