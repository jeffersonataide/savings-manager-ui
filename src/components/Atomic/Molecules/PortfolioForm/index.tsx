import { ChangeEventHandler, useState } from "react";
import { TPortfolioBase } from "services/api/portfolios";

interface PortfolioFormParams {
  initialData?: TPortfolioBase;
  submitButtonText: string;
  onSubmit: (portfolio: TPortfolioBase) => void;
}

const PORTFOLIO_INITIAL = { name: "" };

export const PortfolioForm = ({
  initialData = PORTFOLIO_INITIAL,
  submitButtonText,
  onSubmit,
}: PortfolioFormParams) => {
  const [portfolio, setPortfolio] = useState<TPortfolioBase>(initialData);

  const onNameChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setPortfolio({ ...portfolio, name: e.target.value });
  };

  const handleSubmit = () => {
    onSubmit(portfolio);
    setPortfolio(initialData);
  };

  return (
    <div>
      <div className="my-3 flex items-center">
        <label>Name:</label>
        <input
          className="rounded-lg ml-3 p-2 flex-grow border-slate-400 border-2"
          type="text"
          value={portfolio.name}
          onChange={onNameChange}
        />
      </div>
      <div className="flex justify-end">
        <button
          className="bg-slate-100 my-3 p-1 px-5 rounded-2xl border-slate-500 border-2"
          onClick={handleSubmit}
        >
          {submitButtonText}
        </button>
      </div>
    </div>
  );
};