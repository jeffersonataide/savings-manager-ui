import { useMutation, useQueryClient } from "react-query";
import { deleteDeposit } from "services/api/deposits";
import { DeleteItemForm } from "components/Atomic/Molecules/DeleteItemForm";

interface DeleteDepositFormParams {
  depositId: string;
  onSubmit: () => void;
  onCancel: () => void;
}

export const DeleteDepositForm: React.FC<DeleteDepositFormParams> = ({
  depositId,
  onSubmit,
  onCancel,
}) => {
  const queryClient = useQueryClient();
  const mutation = useMutation(deleteDeposit);

  const handleSubmit = () => {
    mutation.mutate(depositId, {
      onSuccess: () => {
        queryClient.invalidateQueries(["deposits"]);
        onSubmit();
      },
    });
  };

  return (
    <DeleteItemForm
      itemName="deposit"
      onSubmit={handleSubmit}
      onCancel={onCancel}
    />
  );
};
