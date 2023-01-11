import React from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useModal } from "@/contexts/modalContext";
import { fetchAssets, TAsset } from "@/services/api/assets";
import { DeleteAssetForm } from "@/components/Atomic/Organisms/DeleteAssetForm";
import { EditAssetForm } from "@/components/Atomic/Organisms/EditAssetForm";
import { EditIcon } from "@/components/Atomic/Atoms/EditIcon";
import { TrashIcon } from "@/components/Atomic/Atoms/TrashIcon";
import { TableList, TableRow } from "@/components/Atomic/Molecules/TableList";
import { CreateItemModal } from "@/components/Atomic/Molecules/CreateItemModal";
import { CreateAssetForm } from "@/components/Atomic/Organisms/CreateAssetForm";
import { LoadingScreen } from "@/components/Atomic/Molecules/LoadingScreen";

interface AssetsListParams {
  portfolioId: string;
}

export const AssetsList: React.FC<AssetsListParams> = ({ portfolioId }) => {
  const query = useQuery(["assets", portfolioId], () =>
    fetchAssets(portfolioId)
  );

  const modalContext = useModal();

  if (query.isLoading) {
    return <LoadingScreen />;
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
    "Asset",
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
    return {
      columns: [
        {
          content: (
            <Link
              to={`/asset/${asset.id}`}
              className="block w-full text-blue-400 hover:text-blue-200"
            >
              {asset.name.toLocaleUpperCase()}
            </Link>
          ),
        },
        {
          className: "text-right space-x-3",
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
      ],
    };
  });

  return <TableList headers={headers} rows={rows} />;
};
