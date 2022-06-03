import { Route, Routes } from "react-router-dom";
import { Layout } from "../Layout";
import { PortfoliosList } from "../PortfoliosList";

export const Router = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<PortfoliosList />} />
        <Route path="/assets" element={<p>assets page</p>} />
        <Route path="/portfolio" element={<p>portfolio page</p>} />
      </Routes>
    </Layout>
  );
};
