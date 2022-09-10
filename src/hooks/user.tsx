import { useEffect, useState } from "react";
import { getUserMe, TUserBase } from "../services/api/users";

export const useUser = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState<TUserBase>();

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");

    const getUser = async () => {
      try {
        const user = await getUserMe();
        setUser(user);
      } catch (error) {
        throw new Error("Error getting user");
      }
    };

    if (jwt) {
      setIsLogged(true);
      getUser();
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setIsLogged(false);
  };

  return { isLogged, handleLogout, user };
};
