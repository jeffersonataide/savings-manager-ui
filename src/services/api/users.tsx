import { AxiosError } from "axios";
import { api } from ".";

export interface TUserBase {
  username: string;
}

export interface TUserCreate extends TUserBase {
  password: string;
}

export const createUser = async (user: TUserCreate): Promise<TUserBase> => {
  try {
    const response = await api.post<TUserBase>("/users/", user);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error?.response?.status === 409) {
      throw new Error(error.response.data.detail);
    }
    throw new Error("Error creating the user");
  }
};

export const getUserMe = async (): Promise<TUserBase> => {
  try {
    const response = await api.get<TUserBase>("/users/me");
    return response.data;
  } catch (error) {
    throw new Error("Error getting user");
  }
};
