import { ChangeEventHandler, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { createPortfolio, TPortfolioCreate } from "../../services/api";

export const CreatePortfolioForm = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(createPortfolio);

  const [portfolio, setPortfolio] = useState<TPortfolioCreate>({ name: "" });

  const onNameChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setPortfolio({ ...portfolio, name: e.target.value });
  };

  const handleSubmit = () => {
    mutation.mutate(portfolio, {
      onSuccess: () => {
        queryClient.invalidateQueries(["portfolios"]);
      },
    });
  };

  return (
    <div className="border-slate-400 border-2 rounded-lg w-max m-3 p-5 bg-slate-100">
      <h2 className="font-bold text-center">Create Portfolio Form</h2>
      <div className="my-3">
        <label>Name:</label>
        <input
          className="rounded-lg ml-3 p-2 border-slate-400 border-2"
          type="text"
          value={portfolio.name}
          onChange={onNameChange}
        />
      </div>
      <div className="flex justify-end">
        <button
          className="bg-white m-3 p-1 px-5 rounded-lg border-cyan-500 border-2"
          onClick={handleSubmit}
        >
          Create
        </button>
      </div>
      <div>{mutation.isLoading}</div>
    </div>
  );
};
