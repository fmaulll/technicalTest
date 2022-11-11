import React, { FC } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Booku from "./containers/Booku";

const Router: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Booku />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
