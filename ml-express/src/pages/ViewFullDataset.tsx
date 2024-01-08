import React, { useEffect, useState } from 'react';
import CsvTableFull from "../components/Tables/CsvTableFull";
import { useAppSelector } from "../hooks";
import { UploadedData, uploadedDataSelector } from "../features/uploaded_data/uploadedDataSlice";

const UploadDataset: React.FC = () => {

	const [uploadedData, setUploadedData] = useState<UploadedData>({ headers: [], data: [] });

	const selectedUploadedDatas = useAppSelector(uploadedDataSelector);

	useEffect(() => {
		setUploadedData(selectedUploadedDatas);
	}, [selectedUploadedDatas]);

	return (
		<div className='container m-16 ml-28'>
			<div className='mb-8 text-3xl font-bold'>View Full Dataset</div>
			<div className='p-8 justify-center'>
				<CsvTableFull data={uploadedData.data} />
			</div>
		</div>
	);
}

export default UploadDataset;