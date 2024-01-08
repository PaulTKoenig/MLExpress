import React, { ChangeEvent, DragEvent, useState, useRef } from 'react';
import { UploadedData } from "../features/uploaded_data/uploadedDataSlice";
import Papa from 'papaparse';

interface CsvUploaderProps {
  onUpload: (dataset: UploadedData) => void;
}

const CsvUploader: React.FC<CsvUploaderProps> = ({ onUpload }) => {
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      parseCsvFile(selectedFile);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    setFile(droppedFile);
    parseCsvFile(droppedFile);
  };

  const parseCsvFile = (csvFile: File) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      if (event.target && event.target.result) {
        const csvData = Papa.parse(event.target.result.toString(), {
          header: true,
        });

        if (csvData.meta && csvData.meta.fields) {
          onUpload({ headers: csvData.meta.fields, data: csvData.data });
        }
      }
    };

    reader.readAsText(csvFile);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      style={{
        border: '2px dashed #aaa',
        borderRadius: '5px',
        padding: '40px 60px',
        textAlign: 'center',
        cursor: 'pointer',
      }}
      onClick={triggerFileInput}
    >
      <p>Click or drag and drop a CSV file here</p>
      <input
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        style={{ display: 'none' }}
        ref={fileInputRef}
      />
      <label htmlFor="fileInput" style={{ cursor: 'pointer' }}>
        Choose File
      </label>
      {file && <p>Selected file: {file.name}</p>}
    </div>
  );
};

export default CsvUploader;