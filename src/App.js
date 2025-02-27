import React from 'react';
import './App.css';
import {Main} from "./app/pages/main"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BrowserRouter, Routes, Route } from 'react-router';


export function App() {
  return (
    <BrowserRouter>
    <Main></Main>
    </BrowserRouter>
  )
}

export default App;
