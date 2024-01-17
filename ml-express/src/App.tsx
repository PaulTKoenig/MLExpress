import React from 'react';
import { Route, Routes } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './pages/Home';
import InvalidURL from './pages/InvalidURL';
import UploadDataset from './pages/UploadDataset';
import DataExploration from './pages/DataExploration';
import TrainModel from './pages/TrainModel';
import './App.css';

const App: React.FC = () => (
  <div className='flex'>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create-model/upload-dataset" element={<UploadDataset />} />
      <Route path="/create-model/data-exploration" element={<DataExploration />} />
      <Route path="/create-model/train-model" element={<TrainModel />} />
      <Route path="*" element={<InvalidURL />} />
    </Routes>
  </div>
);

export default App;