import React, { useEffect, useState } from 'react';
import { MuiTableFull } from "../components/Tables/MuiTableFull";
import { useAppSelector } from "../hooks";
import { UploadedData, uploadedDataSelector } from "../features/uploaded_data/uploadedDataSlice";

const ViewFullDataset: React.FC = () => {

	const [uploadedData, setUploadedData] = useState<UploadedData>({ headers: [], data: [] });

	const selectedUploadedDatas = useAppSelector(uploadedDataSelector);

	useEffect(() => {
		setUploadedData(selectedUploadedDatas);
	}, [selectedUploadedDatas]);

	return (
		<div className='container m-16 ml-28'>
			<div className='mb-8 text-3xl font-bold'>View Full Dataset</div>
			<div className='p-8 justify-center'>
				<MuiTableFull data={uploadedData.data} headers={uploadedData.headers} />
			</div>
		</div>
	);
}

export default ViewFullDataset;