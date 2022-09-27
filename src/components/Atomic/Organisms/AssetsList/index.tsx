import React from "react";
import { v4 as uuidv4 } from "uuid";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useModal } from "contexts/modalContext";
import { fetchAssets, TAsset } from "services/api/assets";
import { DeleteAssetForm } from "components/Atomic/Organisms/DeleteAssetForm";
import { EditAssetForm } from "components/Atomic/Organisms/EditAssetForm";
import { EditIcon } from "components/Atomic/Atoms/EditIcon";
import { TrashIcon } from "components/Atomic/Atoms/TrashIcon";

interface AssetsListParams {
  portfolioId: string;
}

export const AssetsList: React.FC<AssetsListParams> = ({ portfolioId }) => {
  const query = useQuery("assets", () => fetchAssets(portfolioId));

  const modalContext = useModal();

  if (query.isLoading) {
    return <span>Loading ...</span>;
  }

  if (query.isError && query.error instanceof Error) {
    return <span>Something went wrong ... {query.error.message}</span>;
  }

  const handleDeleteAsset = (assetId: string) => {
    modalContext.openModal({
      title: "Delete Asset",
      content: (
        <DeleteAssetForm
          assetId={assetId}
          onCancel={modalContext.closeModal}
          onSubmit={modalContext.closeModal}
        />
      ),
    });
  };

  const handleEditAsset = (asset: TAsset) => {
    modalContext.openModal({
      title: "Edit Asset",
      content: (
        <EditAssetForm asset={asset} onSubmit={modalContext.closeModal} />
      ),
    });
  };

  return (
    <table className="border-separate border-spacing-y-2 text-2xl w-full">
      <thead>
        <tr className="bg-emerald-300 text-white">
          <th className="p-3 uppercase text-left">Name</th>
          <th className="p-3 uppercase text-left"></th>
        </tr>
      </thead>

      <tbody>
        {query.data?.map((asset) => {
          return (
            <React.Fragment key={uuidv4()}>
              <tr className="bg-slate-600 text-white">
                <td className="p-3">
                  <Link to={`/asset/${asset.id}`} className="block w-full">
                    {asset.name}
                  </Link>
                </td>
                <td className="text-center space-x-3">
                  <button onClick={() => handleEditAsset(asset)}>
                    <EditIcon />
                  </button>
                  <button onClick={() => handleDeleteAsset(asset.id)}>
                    <TrashIcon />
                  </button>
                </td>
              </tr>
            </React.Fragment>
          );
        })}
      </tbody>
    </table>
  );
};
