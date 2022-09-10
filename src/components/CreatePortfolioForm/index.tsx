import { useMutation, useQueryClient } from "react-query";
import { TPortfolioBase, createPortfolio } from "../../services/api/portfolios";
import { PortfolioForm } from "../PortfolioForm";

export const CreatePortfolioForm = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(createPortfolio);

  const handleSubmit = (portfolio: TPortfolioBase) => {
    mutation.mutate(portfolio, {
      onSuccess: () => {
        queryClient.invalidateQueries(["portfolios"]);
      },
    });
  };

  return (
    <PortfolioForm
      title={"Create Portfolio"}
      submitButtonText={"Create"}
      onSubmit={handleSubmit}
    />
  );
};
