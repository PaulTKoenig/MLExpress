import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './pages/Home';
import UploadDataset from './pages/UploadDataset';
import Preprocessing from './pages/ViewFullDataset';
import './App.css';

const App: React.FC = () => (
  <div className='flex'>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create-model/upload-dataset" element={<UploadDataset />} />
      <Route path="/create-model/preprocessing" element={<Preprocessing />} />
      <Route path="*" element={<></>} />
    </Routes>
  </div>
);

export default App;