import { DepositsList } from "components/Atomic/Organisms/DepositsList";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { fetchAsset } from "services/api/assets";

export const AssetDetails = () => {
  const { assetId } = useParams();

  const query = useQuery(["asset", assetId], () =>
    assetId ? fetchAsset(assetId) : null
  );

  if (query.isLoading) {
    return <span>Loading ...</span>;
  }

  if (query.isError && query.error instanceof Error) {
    return <span>Something went wrong ... {query.error.message}</span>;
  }

  if (!query.data) {
    return null;
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-center text-3xl m-4">{query.data.name}</h1>
      <DepositsList assetId={query.data.id} />
    </div>
  );
};
