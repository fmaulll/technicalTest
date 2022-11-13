import React, { FC } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Booku from "./containers/Booku";
import BookuDetail from "./containers/BookuDetail";

const Router: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Booku />} />
        <Route path="/booku/:categoryId/:id" element={<BookuDetail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
