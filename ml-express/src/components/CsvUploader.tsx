import React, { ChangeEvent, DragEvent, useState, useRef } from 'react';
import { UploadedData } from "../features/uploaded_data/uploadedDataSlice";
import { convertStringToType } from '../utils';
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

          let headerTypes = csvData.meta.fields.map((columnName, index) => {

            let data: any[] = csvData.data;
            let values = data.map((row) => row[columnName]);

            let inputType = String(typeof convertStringToType(values[0]));
            let numDiffValues = new Set(values).size;

            if (inputType === "number") {
              const validNumberValues = values.map((str) => parseFloat(str)).filter((num) => !isNaN(num));
              numDiffValues = new Set(validNumberValues).size;

              if (numDiffValues <= 10) inputType = "categorical";
            }

            return {
              columnName: columnName,
              type: inputType,
              numDiffValues: numDiffValues,
            };
          });

          onUpload({ headers: csvData.meta.fields, headerTypes: headerTypes, data: csvData.data, predictedFeature: "", columnsToPredict: [] });
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