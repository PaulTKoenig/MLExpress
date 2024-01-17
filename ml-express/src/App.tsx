import React from 'react';
import { Route, Routes } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './pages/Home';
import InvalidURL from './pages/InvalidURL';
import UploadDataset from './pages/UploadDataset';
import ViewFullDataset from './pages/ViewFullDataset';
import DataExploration from './pages/DataExploration';
import HandleDuplicates from './pages/HandleDuplicates';
import HandleOutliers from './pages/HandleOutliers';
import SelectFeatures from './pages/SelectFeatures';
import Train from './pages/Train';
import './App.css';

const App: React.FC = () => (
  <div className='flex'>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create-model/upload-dataset/import-file" element={<UploadDataset />} />
      <Route path="/create-model/upload-dataset/view-full-dataset" element={<ViewFullDataset />} />
      <Route path="/create-model/data-exploration/explore-relationships" element={<DataExploration />} />
      <Route path="/create-model/data-exploration/handle-duplicates" element={<HandleDuplicates />} />
      <Route path="/create-model/data-exploration/handle-outliers" element={<HandleOutliers />} />
      <Route path="/create-model/train-model/select-features" element={<SelectFeatures />} />
      <Route path="/create-model/train-model/train" element={<Train />} />
      <Route path="*" element={<InvalidURL />} />
    </Routes>
  </div>
);

export default App;