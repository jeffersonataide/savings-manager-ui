import { useMutation, useQueryClient } from "react-query";
import { createPortfolio, TPortfolioBase } from "../../services/api";
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
      title={"Create Portfolio Form"}
      submitButtonText={"Create"}
      onSubmit={handleSubmit}
    />
  );
};
