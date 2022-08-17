interface TPortfolioBase {
  name: string;
}

export interface TPortfolio extends TPortfolioBase {
  id: string;
}

export interface TPortfolios {
  portfolios: TPortfolio[];
}

export interface TPortfolioCreate extends TPortfolioBase {}

const API_URL = process.env.REACT_APP_API_URL;

export const fetchPortfolios = async (): Promise<TPortfolios> => {
  const response = await fetch(`${API_URL}/portfolios`);

  if (!response.ok) {
    throw new Error("Error fetching portfolios");
  }

  return response.json();
};

export const createPortfolio = async (
  portfolio: TPortfolioCreate
): Promise<TPortfolio> => {
  const response = await fetch(`${API_URL}/portfolios`, {
    method: "POST",
    body: JSON.stringify(portfolio),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Error creating the portfolio");
  }

  return response.json();
};

export const deletePortfolio = async (id: string): Promise<TPortfolio> => {
  const response = await fetch(`${API_URL}/portfolios/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Error deleting the portfolio");
  }

  return response.json();
};
