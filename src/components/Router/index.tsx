import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { AssetDetails } from "page/AssetDetails";
import { CreateAccount } from "page/CreateAccount";
import { Home } from "page/Home";
import { Login } from "page/Login";
import { Portfolios } from "page/Portfolios";
import { Layout } from "components/Atomic/Templates/Layout";
import { useEffect } from "react";
import { useUserStore } from "store/userStore";

interface RouteInfo {
  name: string;
  path: string;
  element: JSX.Element;
}

export const openRoutes: RouteInfo[] = [
  {
    name: "Home",
    path: "/",
    element: <Home />,
  },
  {
    name: "Login",
    path: "/login",
    element: <Login />,
  },
  {
    name: "Create Account",
    path: "/create-account",
    element: <CreateAccount />,
  },
];

export const protectedRoutes: RouteInfo[] = [
  { name: "Portfolios", path: "/portfolio", element: <Portfolios /> },
  { name: "Asset details", path: "/asset/:assetId", element: <AssetDetails /> },
];

export const Router = () => {
  const isLogged = useUserStore((state) => state.isLogged);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const isOpenRoute = !!openRoutes.find(
      (route) => route.path === location.pathname
    );
    if (!isLogged && !isOpenRoute) {
      navigate("/");
    }
  }, [isLogged, navigate, location.pathname]);

  const renderRoutes = (routes: RouteInfo[]) => {
    return routes.map((route) => (
      <Route path={route.path} element={route.element} key={uuidv4()} />
    ));
  };

  return (
    <Layout>
      <Routes>
        {renderRoutes(openRoutes)}
        {isLogged ? renderRoutes(protectedRoutes) : null}
      </Routes>
    </Layout>
  );
};
