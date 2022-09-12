import { ChangeEventHandler, useState } from "react";
import { TPortfolioBase } from "../../services/api/portfolios";
import { Box } from "../Atoms/Box";

interface PortfolioFormParams {
  title: string;
  submitButtonText: string;
  onSubmit: (portfolio: TPortfolioBase) => void;
}

const PORTFOLIO_INITIAL = { name: "" };

export const PortfolioForm = ({
  title,
  submitButtonText,
  onSubmit,
}: PortfolioFormParams) => {
  const [portfolio, setPortfolio] = useState<TPortfolioBase>(PORTFOLIO_INITIAL);

  const onNameChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setPortfolio({ ...portfolio, name: e.target.value });
  };

  const hanldeSubmit = () => {
    onSubmit(portfolio);
    setPortfolio(PORTFOLIO_INITIAL);
  };

  return (
    <Box>
      <h2 className="font-bold text-center">{title}</h2>
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
          onClick={hanldeSubmit}
        >
          {submitButtonText}
        </button>
      </div>
    </Box>
  );
};
