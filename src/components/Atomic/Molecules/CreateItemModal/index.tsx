import { TModalProperties, useModal } from "contexts/modalContext";

interface CreateItemModalProps {
  buttonText: string;
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
        {buttonText}
      </button>
    </div>
  );
};
