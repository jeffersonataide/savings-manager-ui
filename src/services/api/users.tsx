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
    throw new Error("Error creating the user");
  }
};
