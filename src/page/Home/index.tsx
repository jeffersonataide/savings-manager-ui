import { PortfoliosList } from "components/Atomic/Organisms/PortfoliosList";
import { useUserStore } from "store/userStore";

export const Home = () => {
  const isLogged = useUserStore((state) => state.isLogged);

  return (
    <div className="flex flex-col items-center">
      {isLogged ? (
        <PortfoliosList />
      ) : (
        <h1 className="text-lg">Create an account to use the application</h1>
      )}
    </div>
  );
};
