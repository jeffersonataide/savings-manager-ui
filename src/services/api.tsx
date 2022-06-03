interface TPortfolio {
  id: string;
  name: string;
}

interface TPortfolios {
  portfolios: TPortfolio[];
}

const API_URL = process.env.REACT_APP_API_URL;

export const fetchPortfolios = async (): Promise<TPortfolios> => {
  const response = await fetch(`${API_URL}/portfolios/`);

  if (!response.ok) {
    throw new Error("Error fetching portfolios");
  }

  return response.json();
};
