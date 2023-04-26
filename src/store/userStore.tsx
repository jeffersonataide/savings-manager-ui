import { create } from "zustand";
import { getUserMe, TUserBase } from "@/services/api/users";
import { getLocalJWT, removeLocalJWT, setLocalJWT } from "@/utils/localStorage";

interface TUserState {
  isLogged: boolean;
  user?: TUserBase;
  jwt?: string | null;
  fetch: () => void;
  handleLogout: () => void;
  handleLogin: (jwt: string) => void;
}

export const useUserStore = create<TUserState>((set) => {
  const jwt = getLocalJWT();

  return {
    isLogged: !!jwt,
    user: undefined,
    jwt,
    fetch: async () => {
      try {
        const user = await getUserMe();
        set({ user });
      } catch (error) {
        throw new Error("Error getting user");
      }
    },
    handleLogout: () => {
      removeLocalJWT();
      set({ isLogged: false, jwt: undefined });
    },
    handleLogin: (jwt: string) => {
      setLocalJWT(jwt);
      set({ isLogged: true, jwt });
    },
  };
});
