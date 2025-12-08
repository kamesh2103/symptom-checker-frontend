import React from "react";
import { Routes, Route } from "react-router";
import useScrollRestore from "../hooks/useScrollRestore";
import DiseasePrediction from "../pages/DiseasePrediction";
import DisPred from "../pages/DisPred";
import Success from "../pages/Success";
import ErrorPage from "../pages/ErrorPage";

const RouterRoutes = () => {
  useScrollRestore();

  return (
    <>
      <Routes>
        <Route path="/" element={<DiseasePrediction />} />
        <Route path="/success" element={<Success />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
};

export default RouterRoutes;
