import { useMutation, useQueryClient } from "react-query";
import { editPortfolio, TPortfolioBase } from "../../services/api";
import { PortfolioForm } from "../PortfolioForm";

interface EditPortfolioFormParams {
  id: string;
  onSubmit: () => void;
}

export const EditPortfolioForm = ({
  id,
  onSubmit,
}: EditPortfolioFormParams) => {
  const queryClient = useQueryClient();
  const mutation = useMutation(editPortfolio);

  const handleSubmit = (portfolio: TPortfolioBase) => {
    mutation.mutate(
      { id, portfolio },
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
      title={"Edit Portfolio"}
      submitButtonText={"Edit"}
      onSubmit={handleSubmit}
    />
  );
};
