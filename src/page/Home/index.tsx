import { useState } from "react";

import { Modal } from "../../components/Atoms/Modal";
import { CreatePortfolioForm } from "../../components/CreatePortfolioForm";
import { PortfoliosList } from "../../components/PortfoliosList";

export const Home = () => {
  const [isOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

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
      <Modal title="Create Portfolio" isOpen={isOpen} closeModal={closeModal}>
        <CreatePortfolioForm onSubmit={closeModal} />
      </Modal>
      <PortfoliosList />
    </div>
  );
};
