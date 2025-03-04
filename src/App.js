import React from 'react';
import './App.css';
import { Main } from './app/pages/main';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Admin } from './app/pages/Admin/index';
import { ThemeProvider } from "@material-tailwind/react";

export function App() {
  return (

      <BrowserRouter>
        <Routes>
          <Route path="admin/*" element={<Admin />} />
          <Route path="/main*" element={<Main />} />
        </Routes>
      </BrowserRouter>

  );
}

export default App;