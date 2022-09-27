import { Route, Routes } from "react-router-dom";
import { AssetDetails } from "../../page/AssetDetails";
import { CreateAccount } from "../../page/CreateAccount";
import { Home } from "../../page/Home";
import { Login } from "../../page/Login";
import { PortfolioDetails } from "../../page/PortfolioDetails";
import { Portfolios } from "../../page/Portfolios";
import { Layout } from "../Atomic/Templates/Layout";

export const Router = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/portfolio" element={<Portfolios />} />
        <Route path="/portfolio/:portfolioId" element={<PortfolioDetails />} />
        <Route path="/asset/:assetId" element={<AssetDetails />} />
      </Routes>
    </Layout>
  );
};
