import { api } from ".";

export interface TBaseDeposit {
  amount: number;
  date: string;
  description?: string;
}

export interface TDeposit extends TBaseDeposit {
  id: string;
  asset_id: string;
}

export const fetchDeposits = async (assetId: string): Promise<TDeposit[]> => {
  try {
    const response = await api.get<TDeposit[]>(
      `/deposits/?asset_id=${assetId}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Error fetching deposits");
  }
};
