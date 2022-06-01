import { Route, Routes } from "react-router-dom";
import { Layout } from "../Layout";

export const Router = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<p>Savings Manager</p>} />
        <Route path="/assets" element={<p>assets</p>} />
        <Route path="/portfolio" element={<p>portfolio</p>} />
      </Routes>
    </Layout>
  );
};
