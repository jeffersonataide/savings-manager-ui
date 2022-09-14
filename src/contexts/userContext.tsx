import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserMe, TUserBase } from "../services/api/users";

interface TUserContext {
  isLogged: boolean;
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
  user?: TUserBase;
  setUser: React.Dispatch<React.SetStateAction<TUserBase | undefined>>;
  onLogin: (jwt: string) => void;
  handleLogout: () => void;
}

const UserContext = createContext<TUserContext | null>(null);

export const useUser = () => {
  const userContext = useContext(UserContext);
  return userContext;
};

interface UserProviderProps {
  children?: React.ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [user, setUser] = useState<TUserBase>();
  const navigate = useNavigate();

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");

    if (jwt) {
      setIsLogged(true);
    }
  }, []);

  useEffect(() => {
    const getUser = async () => {
      try {
        const user = await getUserMe();
        setUser(user);
      } catch (error) {
        throw new Error("Error getting user");
      }
    };

    if (isLogged) {
      getUser();
    }
  }, [isLogged]);

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setIsLogged(false);
    navigate("/");
  };

  const onLogin = (jwt: string) => {
    localStorage.setItem("jwt", jwt);
    setIsLogged(true);
  };

  return (
    <UserContext.Provider
      value={{ isLogged, setIsLogged, user, setUser, onLogin, handleLogout }}
    >
      {children}
    </UserContext.Provider>
  );
};
