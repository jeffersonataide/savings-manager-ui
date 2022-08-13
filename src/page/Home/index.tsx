import { CreatePortfolioForm } from "../../components/CreatePortfolioForm";
import { PortfoliosList } from "../../components/PortfoliosList";

export const Home = () => {
  return (
    <div className="flex flex-col items-center">
      <CreatePortfolioForm />
      <PortfoliosList />
    </div>
  );
};
