import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './pages/Home';
import InvalidURL from './pages/InvalidURL';
import UploadDataset from './pages/UploadDataset';
import Preprocessing from './pages/ViewFullDataset';
import DataExploration from './pages/DataExploration';
import HandleDuplicates from './pages/HandleDuplicates';
import './App.css';

const App: React.FC = () => (
  <div className='flex'>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create-model/upload-dataset/import-file" element={<UploadDataset />} />
      <Route path="/create-model/upload-dataset/preprocessing" element={<Preprocessing />} />
      <Route path="/create-model/data-exploration/explore-relationships" element={<DataExploration />} />
      <Route path="/create-model/data-exploration/handle-duplicates" element={<HandleDuplicates />} />
      <Route path="*" element={<InvalidURL />} />
    </Routes>
  </div>
);

export default App;