import { useMutation, useQueryClient } from "react-query";
import { deletePortfolio } from "../../services/api/portfolios";

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
    <div>
      <h2>Are you sure you want to delete the portfolio?</h2>

      <div className="flex justify-end space-x-2">
        <button
          className="bg-slate-100 my-3 p-1 px-5 rounded-2xl border-slate-500 border-2"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          className="bg-slate-100 my-3 p-1 px-5 rounded-2xl border-slate-500 border-2"
          onClick={handleSubmit}
        >
          Yes
        </button>
      </div>
    </div>
  );
};
