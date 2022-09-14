import { Route, Routes } from "react-router-dom";
import { CreateAccount } from "../../page/CreateAccount";
import { Home } from "../../page/Home";
import { Login } from "../../page/Login";
import { Portfolios } from "../../page/Portfolios";
import { Layout } from "../Layout";

export const Router = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/assets" element={<p>assets page</p>} />
        <Route path="/portfolio" element={<Portfolios />} />
      </Routes>
    </Layout>
  );
};
