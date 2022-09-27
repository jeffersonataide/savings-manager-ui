import { useMutation, useQueryClient } from "react-query";
import { deleteAsset } from "services/api/assets";
import { DeleteItemForm } from "components/Atomic/Molecules/DeleteItemForm";

interface DeleteAssetFormParams {
  assetId: string;
  onSubmit: () => void;
  onCancel: () => void;
}

export const DeleteAssetForm: React.FC<DeleteAssetFormParams> = ({
  assetId,
  onSubmit,
  onCancel,
}) => {
  const queryClient = useQueryClient();
  const mutation = useMutation(deleteAsset);

  const handleSubmit = () => {
    mutation.mutate(assetId, {
      onSuccess: () => {
        queryClient.invalidateQueries(["assets"]);
        onSubmit();
      },
    });
  };

  return (
    <DeleteItemForm
      itemName="asset"
      onSubmit={handleSubmit}
      onCancel={onCancel}
    />
  );
};
