import { TableList, TableRow } from "components/Atomic/Molecules/TableList";
import { useQuery } from "react-query";
import { fetchDeposits } from "services/api/deposits";

interface DepositsListParams {
  assetId: string;
}

export const DepositsList: React.FC<DepositsListParams> = ({ assetId }) => {
  const query = useQuery("deposits", () => fetchDeposits(assetId));

  if (query.isLoading) {
    return <span>Loading ...</span>;
  }

  if (query.isError && query.error instanceof Error) {
    return <span>Something went wrong ... {query.error.message}</span>;
  }

  if (!query.data) {
    return null;
  }

  const headers = ["Date", "Description", "Amount"];

  const rows: TableRow[] = query.data.map((deposit) => {
    return [
      {
        content: deposit.date,
      },
      {
        content: deposit.description ? deposit.description : "",
      },
      {
        content: deposit.amount,
      },
    ];
  });
  return <TableList headers={headers} rows={rows} />;
};
