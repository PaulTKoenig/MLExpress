import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './components/home';
import Navbar from './components/navbar';
import './App.css';

const App: React.FC = () => (
  <div className='flex'>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  </div>
);

export default App;