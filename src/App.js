import React from 'react';
import './App.css';
import { Main } from './app/pages/main';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Ensure you import from 'react-router-dom'
import { Input } from './app/pages/total/php/input'; // Check this path for correctness

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
      <Routes>
        <Route path="/input" element={<Input />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;