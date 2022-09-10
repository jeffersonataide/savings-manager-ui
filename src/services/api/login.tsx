import { API_URL } from ".";

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

  const response = await fetch(`${API_URL}/token`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Error logging in");
  }

  return response.json();
};
