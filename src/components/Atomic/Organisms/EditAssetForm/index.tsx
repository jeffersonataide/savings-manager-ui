import { useMutation, useQueryClient } from "react-query";
import { editAsset, TAsset, TAssetBase } from "@/services/api/assets";
import { AssetForm } from "@/components/Atomic/Molecules/AssetForm";

interface EditAssetFormParams {
  asset: TAsset;
  onSubmit: () => void;
}

export const EditAssetForm = ({ asset, onSubmit }: EditAssetFormParams) => {
  const queryClient = useQueryClient();
  const mutation = useMutation(editAsset);

  const handleSubmit = (assetUpdate: TAssetBase) => {
    mutation.mutate(
      { id: asset.id, asset: assetUpdate },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["assets"]);
        },
        onSettled: () => {
          onSubmit();
        },
      }
    );
  };

  return (
    <AssetForm
      initialData={asset}
      submitButtonText={"Save"}
      isLoading={mutation.isLoading}
      onSubmit={handleSubmit}
    />
  );
};
