import { useMutation, useQueryClient } from "react-query";
import { editAsset, TAssetBase } from "../../services/api/assets";
import {
  editPortfolio,
  TPortfolio,
  TPortfolioBase,
} from "../../services/api/portfolios";
import { AssetForm } from "../AssetForm";

interface EditAssetFormParams {
  asset: TPortfolio;
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
      submitButtonText={"Edit"}
      onSubmit={handleSubmit}
    />
  );
};
