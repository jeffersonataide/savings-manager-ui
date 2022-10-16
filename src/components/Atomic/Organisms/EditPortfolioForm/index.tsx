import { useMutation, useQueryClient } from "react-query";
import {
  editPortfolio,
  TPortfolio,
  TPortfolioBase,
} from "services/api/portfolios";
import { PortfolioForm } from "components/Atomic/Molecules/PortfolioForm";

interface EditPortfolioFormParams {
  portfolio: TPortfolio;
  onSubmit: () => void;
}

export const EditPortfolioForm = ({
  portfolio,
  onSubmit,
}: EditPortfolioFormParams) => {
  const queryClient = useQueryClient();
  const mutation = useMutation(editPortfolio);

  const handleSubmit = (portfolioUpdate: TPortfolioBase) => {
    mutation.mutate(
      { id: portfolio.id, portfolio: portfolioUpdate },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["portfolios"]);
        },
        onSettled: () => {
          onSubmit();
        },
      }
    );
  };

  return (
    <PortfolioForm
      initialData={portfolio}
      submitButtonText={"Save"}
      onSubmit={handleSubmit}
    />
  );
};
