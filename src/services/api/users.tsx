import { API_URL } from ".";

export interface TUserBase {
  username: string;
}

export interface TUserCreate extends TUserBase {
  password: string;
}

export const createUser = async (user: TUserCreate): Promise<TUserBase> => {
  const response = await fetch(`${API_URL}/users/`, {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Error creating the user");
  }

  return response.json();
};
