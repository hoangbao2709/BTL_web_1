import React from 'react';
import './App.css';
import { Main } from './app/pages/main';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Admin } from './app/pages/Admin/index';
import { Product } from "./app/pages/Product/product";
;
export function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="admin/*" element={<Admin />} />
          <Route path="/main*" element={<Main />} />
          <Route path="/Product/:page?/:name?" element={<Product />} />
          <Route path="/Products/:name?" element={<Product />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;