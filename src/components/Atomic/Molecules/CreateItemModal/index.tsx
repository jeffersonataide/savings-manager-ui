import { TModalProperties, useModal } from "contexts/modalContext";
import { PlusIcon } from "@heroicons/react/20/solid";

interface CreateItemModalProps {
  buttonText?: string | JSX.Element;
  modalProperties: TModalProperties;
}

export const CreateItemModal: React.FC<CreateItemModalProps> = ({
  buttonText,
  modalProperties,
}) => {
  const modalContext = useModal();

  const openModal = () => {
    modalContext.openModal(modalProperties);
  };

  return (
    <div className="text-right">
      <button
        type="button"
        onClick={openModal}
        className="rounded-md bg-black bg-opacity-70 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-60"
      >
        {buttonText ? buttonText : <PlusIcon height="20" width="20" />}
      </button>
    </div>
  );
};
