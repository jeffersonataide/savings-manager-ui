import { Route, Routes } from "react-router-dom";
import { Home } from "../../page/Home";
import { Layout } from "../Layout";
import { PortfoliosList } from "../PortfoliosList";

export const Router = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/assets" element={<p>assets page</p>} />
        <Route path="/portfolio" element={<PortfoliosList />} />
      </Routes>
    </Layout>
  );
};
