import { useQuery } from "react-query";
import { fetchDeposits, TDeposit } from "services/api/deposits";
import { useModal } from "contexts/modalContext";
import { sortByDate } from "utils/sorting";
import { formatDateStringToLong } from "utils/dateFormating";
import { DeleteDepositForm } from "components/Atomic/Organisms/DeleteDepositForm";
import { EditDepositForm } from "components/Atomic/Organisms/EditDepositForm";
import { CreateItemModal } from "components/Atomic/Molecules/CreateItemModal";
import { CreateDepositForm } from "components/Atomic/Organisms/CreateDepositForm";
import { EditIcon } from "components/Atomic/Atoms/EditIcon";
import { TrashIcon } from "components/Atomic/Atoms/TrashIcon";
import { TableList, TableRow } from "components/Atomic/Molecules/TableList";

interface DepositsListParams {
  assetId: string;
}

export const DepositsList: React.FC<DepositsListParams> = ({ assetId }) => {
  const query = useQuery("deposits", () => fetchDeposits(assetId));
  const modalContext = useModal();

  if (query.isLoading) {
    return <span>Loading ...</span>;
  }

  if (query.isError && query.error instanceof Error) {
    return <span>Something went wrong ... {query.error.message}</span>;
  }

  if (!query.data) {
    return null;
  }

  const handleDeleteDeposit = (depositId: string) => {
    modalContext.openModal({
      title: "Delete Deposit",
      content: (
        <DeleteDepositForm
          depositId={depositId}
          onCancel={modalContext.closeModal}
          onSubmit={modalContext.closeModal}
        />
      ),
    });
  };

  const handleEditDeposit = (deposit: TDeposit) => {
    modalContext.openModal({
      title: "Edit Deposit",
      content: (
        <EditDepositForm deposit={deposit} onSubmit={modalContext.closeModal} />
      ),
    });
  };

  const headers = [
    "Date",
    "Description",
    "Amount",
    <CreateItemModal
      modalProperties={{
        title: "Create deposit",
        content: (
          <CreateDepositForm
            onSubmit={modalContext.closeModal}
            assetId={assetId}
          />
        ),
      }}
    />,
  ];

  const rows: TableRow[] = query.data.sort(sortByDate).map((deposit) => {
    const formattedDepositDate = formatDateStringToLong(deposit.date);
    return [
      {
        content: formattedDepositDate,
      },
      {
        content: deposit.description ? deposit.description : "",
      },
      {
        content: deposit.amount,
      },
      {
        className: "text-right space-x-3",
        content: (
          <>
            <button onClick={() => handleEditDeposit(deposit)}>
              <EditIcon />
            </button>
            <button onClick={() => handleDeleteDeposit(deposit.id)}>
              <TrashIcon />
            </button>
          </>
        ),
      },
    ];
  });
  return <TableList headers={headers} rows={rows} />;
};
