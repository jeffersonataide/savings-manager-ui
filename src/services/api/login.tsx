import { api } from ".";

export interface TUserLogin {
  username: string;
  password: string;
}

export interface TLoginToken {
  access_token: string;
  token_type: string;
}

export const login = async (user: TUserLogin): Promise<TLoginToken> => {
  const formData = new FormData();
  formData.set("username", user.username);
  formData.set("password", user.password);

  try {
    const response = await api.post<TLoginToken>(`/token`, formData);
    return response.data;
  } catch (error) {
    throw new Error("Error logging in");
  }
};
