import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { DepositsChart } from "components/Atomic/Molecules/DepositsChart";
import { LoadingScreen } from "components/Atomic/Molecules/LoadingScreen";
import { DepositsList } from "components/Atomic/Organisms/DepositsList";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { fetchAsset } from "services/api/assets";

export const AssetDetails = () => {
  const { assetId } = useParams();
  const navigate = useNavigate();

  const query = useQuery(["asset", assetId], () =>
    assetId ? fetchAsset(assetId) : null
  );

  if (query.isLoading) {
    return <LoadingScreen />;
  }

  if (query.isError && query.error instanceof Error) {
    return <span>Something went wrong ... {query.error.message}</span>;
  }

  if (!query.data) {
    return null;
  }

  const handleBackButton = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center">
      <div className="grid grid-cols-3 w-full">
        <button className="h-10 w-10 m-5" onClick={handleBackButton}>
          <ArrowLeftIcon className="hover:fill-slate-400" />
        </button>
        <h1 className="text-center text-3xl m-4">
          {query.data.name.toLocaleUpperCase()} DEPOSITS
        </h1>
      </div>
      <DepositsChart assetName={query.data.name} assetId={query.data.id} />
      <DepositsList assetId={query.data.id} />
    </div>
  );
};
