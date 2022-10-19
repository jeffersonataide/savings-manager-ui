import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { createAsset, TAssetBase } from "services/api/assets";
import { AssetForm } from "components/Atomic/Molecules/AssetForm";

interface CreateAssetFormParams {
  portfolioId: string;
  onSubmit?: () => void;
}

export const CreateAssetForm: React.FC<CreateAssetFormParams> = ({
  portfolioId,
  onSubmit = () => {},
}) => {
  const queryClient = useQueryClient();
  const mutation = useMutation(createAsset);

  const handleSubmit = (asset: TAssetBase) => {
    mutation.mutate(
      { asset, portfolioId },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["assets"]);
          onSubmit();
        },
      }
    );
  };

  return (
    <AssetForm
      submitButtonText={"Create"}
      onSubmit={handleSubmit}
      isLoading={mutation.isLoading}
    />
  );
};
