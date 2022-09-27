import { PortfoliosList } from "../../components/Atomic/Organisms/PortfoliosList";
import { useUser } from "contexts/userContext";

export const Home = () => {
  const userContext = useUser();

  return (
    <div className="flex flex-col items-center">
      {userContext?.isLogged ? (
        <PortfoliosList />
      ) : (
        <h1 className="text-lg">Create an account to use the application</h1>
      )}
    </div>
  );
};
