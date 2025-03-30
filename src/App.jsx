import {BrowserRouter, Routes, Route} from "react-router-dom"
import Admin from './components/app/pages/Admin/index';
import Product  from "./components/app/pages/Product/product";
import Main from './components/app/pages/main';
import React from 'react';
import "./App.css"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Main />} />
        <Route path="/admin*" element={<Admin />} />
        <Route path="/main*" element={<Main />} />
        <Route path="/Product/:page?/:name?" element={<Product />} />
        <Route path="/Products/:name?" element={<Product />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
