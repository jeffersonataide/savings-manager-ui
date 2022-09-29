import React from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useModal } from "contexts/modalContext";
import { fetchAssets, TAsset } from "services/api/assets";
import { DeleteAssetForm } from "components/Atomic/Organisms/DeleteAssetForm";
import { EditAssetForm } from "components/Atomic/Organisms/EditAssetForm";
import { EditIcon } from "components/Atomic/Atoms/EditIcon";
import { TrashIcon } from "components/Atomic/Atoms/TrashIcon";
import { TableList, TableRow } from "components/Atomic/Molecules/TableList";
import { CreateItemModal } from "components/Atomic/Molecules/CreateItemModal";
import { CreateAssetForm } from "components/Atomic/Organisms/CreateAssetForm";

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

  if (!query.data) {
    return null;
  }

  const headers = [
    "Name",
    <CreateItemModal
      modalProperties={{
        title: "Create Asset",
        content: (
          <CreateAssetForm
            onSubmit={modalContext.closeModal}
            portfolioId={portfolioId}
          />
        ),
      }}
    />,
  ];

  const rows: TableRow[] = query.data.map((asset) => {
    return [
      {
        content: (
          <Link to={`/asset/${asset.id}`} className="block w-full">
            {asset.name}
          </Link>
        ),
      },
      {
        className: "text-center space-x-3",
        content: (
          <>
            <button onClick={() => handleEditAsset(asset)}>
              <EditIcon />
            </button>
            <button onClick={() => handleDeleteAsset(asset.id)}>
              <TrashIcon />
            </button>
          </>
        ),
      },
    ];
  });

  return <TableList headers={headers} rows={rows} />;
};
