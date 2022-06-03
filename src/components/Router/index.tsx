import { Route, Routes } from "react-router-dom";
import { Layout } from "../Layout";

export const Router = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<p>Home page</p>} />
        <Route path="/assets" element={<p>assets page</p>} />
        <Route path="/portfolio" element={<p>portfolio page</p>} />
      </Routes>
    </Layout>
  );
};
