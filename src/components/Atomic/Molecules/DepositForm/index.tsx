import { ChangeEventHandler, useState } from "react";
import { TDepositBase } from "services/api/deposits";

interface DepositFormParams {
  initialData?: TDepositBase;
  submitButtonText: string;
  onSubmit: (deposit: TDepositBase) => void;
}

const DEPOSIT_INITIAL = {
  amount: 0,
  date: "",
  description: "",
};

export const DepositForm = ({
  initialData = DEPOSIT_INITIAL,
  submitButtonText,
  onSubmit,
}: DepositFormParams) => {
  const [deposit, setDeposit] = useState<TDepositBase>(initialData);

  const onAmountChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setDeposit({ ...deposit, amount: Number(e.target.value) });
  };

  const onDateChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setDeposit({ ...deposit, date: e.target.value });
  };

  const onDescriptionChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setDeposit({ ...deposit, description: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(deposit);
    setDeposit(initialData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="my-3 flex items-center">
        <label>Amount:</label>
        <input
          className="rounded-lg ml-3 p-2 flex-grow border-slate-400 border-2"
          type="text"
          value={deposit.amount}
          onChange={onAmountChange}
        />
      </div>
      <div className="my-3 flex items-center">
        <label>Date:</label>
        <input
          className="rounded-lg ml-3 p-2 flex-grow border-slate-400 border-2"
          type="text"
          value={deposit.date}
          onChange={onDateChange}
        />
      </div>
      <div className="my-3 flex items-center">
        <label>Description:</label>
        <input
          className="rounded-lg ml-3 p-2 flex-grow border-slate-400 border-2"
          type="text"
          value={deposit.description}
          onChange={onDescriptionChange}
        />
      </div>
      <div className="flex justify-end">
        <button
          className="bg-slate-100 my-3 p-1 px-5 rounded-2xl border-slate-500 border-2"
          type="submit"
        >
          {submitButtonText}
        </button>
      </div>
    </form>
  );
};
