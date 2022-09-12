import { CreatePortfolioForm } from "../../components/CreatePortfolioForm";
import { PortfoliosList } from "../../components/PortfoliosList";
import { useModal } from "../../contexts/modalContext";

export const Home = () => {
  const modalContext = useModal();

  const openModal = () => {
    modalContext.openModal({
      title: "Create Portfolio",
      content: <CreatePortfolioForm onSubmit={modalContext.closeModal} />,
    });
  };

  return (
    <div className="flex flex-col items-center">
      <div className="my-4">
        <button
          type="button"
          onClick={openModal}
          className="rounded-md bg-black bg-opacity-70 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-60 "
        >
          Create portfolio
        </button>
      </div>
      <PortfoliosList />
    </div>
  );
};
