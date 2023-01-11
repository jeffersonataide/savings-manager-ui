import { useMutation, useQueryClient } from "react-query";
import { deletePortfolio } from "@/services/api/portfolios";
import { DeleteItemForm } from "@/components/Atomic/Molecules/DeleteItemForm";

interface DeletePortfolioFormParams {
  portfolioId: string;
  onSubmit: () => void;
  onCancel: () => void;
}

export const DeletePortfolioForm: React.FC<DeletePortfolioFormParams> = ({
  portfolioId,
  onSubmit,
  onCancel,
}) => {
  const queryClient = useQueryClient();
  const mutation = useMutation(deletePortfolio);

  const handleSubmit = () => {
    mutation.mutate(portfolioId, {
      onSuccess: () => {
        queryClient.invalidateQueries(["portfolios"]);
        onSubmit();
      },
    });
  };

  return (
    <DeleteItemForm
      itemName="portfolio"
      isLoading={mutation.isLoading}
      onCancel={onCancel}
      onSubmit={handleSubmit}
    />
  );
};
