import React, { useEffect, useState } from 'react';
import CsvTableFull from "../components/CsvTableFull";
import { useAppDispatch, useAppSelector } from "../hooks";
import { UploadedData, uploadedDataSelector } from "../features/uploaded_data/uploadedDataSlice";

const UploadDataset: React.FC = () => {

	const [uploadedData, setUploadedData] = useState<any[]>([]);

	const selectedUploadedDatas = useAppSelector(uploadedDataSelector);
	
	useEffect(() => {
		setUploadedData(selectedUploadedDatas);
		return () => {
			console.log("component unmounting...");
		};
	}, [selectedUploadedDatas]);

	return (
		<>
			<CsvTableFull data={uploadedData} />
		</>
	);
}

export default UploadDataset;