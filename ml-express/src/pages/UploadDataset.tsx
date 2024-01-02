import React, { useEffect, useState } from 'react';
import CsvUploader from '../components/CsvUploader';
import CsvTablePreview from '../components/CsvTablePreview';
import { useAppDispatch, useAppSelector } from "../hooks";
import { UploadedData, setUploadedData, uploadedDataSelector } from "../features/uploaded_data/uploadedDataSlice";

const UploadDataset: React.FC = () => {

	const [csvData, setCsvData] = useState<UploadedData>([]);

	const selectedUploadedData = useAppSelector(uploadedDataSelector);
	const dispatch = useAppDispatch();

	useEffect(() => {
		setCsvData(selectedUploadedData);
		return () => {
			console.log("component unmounting...");
		};
	}, [selectedUploadedData]);

	const handleUploadedData = (data: UploadedData) => {
		console.log(data);
		dispatch(setUploadedData(data));
	}

	const handleUpload = (data: UploadedData) => {
		console.log('Uploaded CSV data:', data);
		setCsvData(data);
		handleUploadedData(data);
	};

	return (
		<>
			<CsvUploader onUpload={handleUpload} />
			<CsvTablePreview data={csvData} />
		</>
	);
}

export default UploadDataset;