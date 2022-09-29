import create from "zustand";
import { getUserMe, TUserBase } from "services/api/users";
import { removeLocalJWT, setLocalJWT } from "utils/localStorage";

interface TUserState {
  isLogged: boolean;
  user?: TUserBase;
  fetch: () => void;
  handleLogout: () => void;
  handleLogin: (jwt: string) => void;
}

export const useUserStore = create<TUserState>((set) => {
  return {
    isLogged: false,
    user: undefined,
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
      set({ isLogged: false });
    },
    handleLogin: (jwt: string) => {
      setLocalJWT(jwt);
      set({ isLogged: true });
    },
  };
});
