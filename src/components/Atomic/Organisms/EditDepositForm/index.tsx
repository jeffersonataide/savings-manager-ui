import { DepositForm } from "components/Atomic/Molecules/DepositForm";
import { useMutation, useQueryClient } from "react-query";
import { TDepositBase, TDeposit, editDeposit } from "services/api/deposits";

interface EditDepositFormParams {
  deposit: TDeposit;
  onSubmit: () => void;
}

export const EditDepositForm = ({
  deposit,
  onSubmit,
}: EditDepositFormParams) => {
  const queryClient = useQueryClient();
  const mutation = useMutation(editDeposit);

  const handleSubmit = (depositUpdate: TDepositBase) => {
    mutation.mutate(
      { id: deposit.id, deposit: depositUpdate },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["deposits"]);
        },
        onSettled: () => {
          onSubmit();
        },
      }
    );
  };

  return (
    <DepositForm
      initialData={deposit}
      submitButtonText={"Save"}
      onSubmit={handleSubmit}
    />
  );
};
