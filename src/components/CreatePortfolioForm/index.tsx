import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { TPortfolioBase, createPortfolio } from "../../services/api/portfolios";
import { PortfolioForm } from "../PortfolioForm";

interface CreatePortfolioFormParams {
  onSubmit?: () => void;
}

export const CreatePortfolioForm: React.FC<CreatePortfolioFormParams> = ({
  onSubmit = () => {},
}) => {
  const queryClient = useQueryClient();
  const mutation = useMutation(createPortfolio);

  const handleSubmit = (portfolio: TPortfolioBase) => {
    mutation.mutate(portfolio, {
      onSuccess: () => {
        queryClient.invalidateQueries(["portfolios"]);
        onSubmit();
      },
    });
  };

  return <PortfolioForm submitButtonText={"Create"} onSubmit={handleSubmit} />;
};
