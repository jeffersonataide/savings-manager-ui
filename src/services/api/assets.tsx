import { api } from ".";

export interface TAssetBase {
  name: string;
}

export interface TAsset extends TAssetBase {
  id: string;
}

export const fetchAssets = async (portfolioId: string): Promise<TAsset[]> => {
  try {
    const response = await api.get<TAsset[]>(
      `/assets/?portfolio_id=${portfolioId}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Error fetching assets");
  }
};

export const fetchAsset = async (id: string): Promise<TAsset> => {
  try {
    const response = await api.get<TAsset>(`/assets/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching asset");
  }
};

export interface TAssetCreate extends TAssetBase {}

interface CreateAssetParams {
  portfolioId: string;
  asset: TAssetCreate;
}

export const createAsset = async ({
  asset,
  portfolioId,
}: CreateAssetParams): Promise<TAsset> => {
  try {
    const response = await api.post<TAsset>("/assets/", {
      ...asset,
      portfolio_id: portfolioId,
    });
    return response.data;
  } catch (error) {
    throw new Error("Error creating the asset");
  }
};

interface EditAssetParams {
  id: string;
  asset: TAssetCreate;
}

export const editAsset = async ({
  id,
  asset,
}: EditAssetParams): Promise<TAsset> => {
  try {
    const response = await api.put<TAsset>(`/assets/${id}`, asset);
    return response.data;
  } catch (error) {
    throw new Error("Error editing the asset");
  }
};

export const deleteAsset = async (id: string): Promise<TAsset> => {
  try {
    const response = await api.delete<TAsset>(`/assets/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Error deleting the portfolio");
  }
};
