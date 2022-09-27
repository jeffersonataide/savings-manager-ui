import { api } from ".";

export interface TDepositBase {
  amount: number;
  date: string;
  description?: string;
}

export interface TDeposit extends TDepositBase {
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

interface EditDepositParams {
  id: string;
  deposit: TDepositBase;
}

export const editDeposit = async ({
  id,
  deposit,
}: EditDepositParams): Promise<TDeposit> => {
  try {
    const response = await api.put<TDeposit>(`/deposits/${id}`, deposit);
    return response.data;
  } catch (error) {
    throw new Error("Error editing the deposit");
  }
};

export const deleteDeposit = async (id: string): Promise<TDeposit> => {
  try {
    const response = await api.delete<TDeposit>(`/deposits/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Error deleting the deposit");
  }
};
