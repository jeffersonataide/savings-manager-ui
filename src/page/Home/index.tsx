import { useUserStore } from "@/store/userStore";

import { PortfoliosList } from "@/components/Atomic/Organisms/PortfoliosList";
import clsx from "clsx";

export const Home = () => {
  const isLogged = useUserStore((state) => state.isLogged);

  return (
    <div
      className={clsx(
        "flex flex-col items-center flex-1",
        !isLogged && "justify-center"
      )}
    >
      {isLogged ? (
        <PortfoliosList />
      ) : (
        <h1 className="text-lg font-mono">
          Create an account to use the application
        </h1>
      )}
    </div>
  );
};
