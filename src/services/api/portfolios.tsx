import { api } from ".";

export interface TPortfolioBase {
  name: string;
}

export interface TPortfolio extends TPortfolioBase {
  id: string;
}

export const fetchPortfolios = async (): Promise<TPortfolio[]> => {
  try {
    const response = await api.get<TPortfolio[]>("/portfolios/");
    return response.data;
  } catch (error) {
    throw new Error("Error fetching portfolios");
  }
};

export const fetchPortfolio = async (id: string): Promise<TPortfolio> => {
  try {
    const response = await api.get<TPortfolio>(`/portfolios/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching portfolio");
  }
};

export interface TPortfolioCreate extends TPortfolioBase {}

export const createPortfolio = async (
  portfolio: TPortfolioCreate
): Promise<TPortfolio> => {
  try {
    const response = await api.post<TPortfolio>("/portfolios/", portfolio);
    return response.data;
  } catch (error) {
    throw new Error("Error creating the portfolio");
  }
};

interface EditPortfolioParams {
  id: string;
  portfolio: TPortfolioCreate;
}

export const editPortfolio = async ({
  id,
  portfolio,
}: EditPortfolioParams): Promise<TPortfolio> => {
  try {
    const response = await api.put<TPortfolio>(`/portfolios/${id}`, portfolio);
    return response.data;
  } catch (error) {
    throw new Error("Error editing the portfolio");
  }
};

export const deletePortfolio = async (id: string): Promise<TPortfolio> => {
  try {
    const response = await api.delete<TPortfolio>(`/portfolios/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Error deleting the portfolio");
  }
};
