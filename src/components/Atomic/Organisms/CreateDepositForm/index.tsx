import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { createDeposit, TDepositBase } from "services/api/deposits";
import { DepositForm } from "components/Atomic/Molecules/DepositForm";

interface CreateDepositFormParams {
  assetId: string;
  onSubmit?: () => void;
}

export const CreateDepositForm: React.FC<CreateDepositFormParams> = ({
  assetId,
  onSubmit = () => {},
}) => {
  const queryClient = useQueryClient();
  const mutation = useMutation(createDeposit);

  const handleSubmit = (deposit: TDepositBase) => {
    mutation.mutate(
      { deposit, assetId },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["deposits"]);
          onSubmit();
        },
      }
    );
  };

  return (
    <DepositForm
      submitButtonText={"Create"}
      onSubmit={handleSubmit}
      isLoading={mutation.isLoading}
    />
  );
};
