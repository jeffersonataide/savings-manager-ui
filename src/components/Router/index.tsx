import { Route, Routes } from "react-router-dom";
import { Home } from "../../page/Home";
import { Login } from "../../page/Login";
import { Layout } from "../Layout";
import { PortfoliosList } from "../PortfoliosList";

export const Router = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/assets" element={<p>assets page</p>} />
        <Route path="/portfolio" element={<PortfoliosList />} />
      </Routes>
    </Layout>
  );
};
