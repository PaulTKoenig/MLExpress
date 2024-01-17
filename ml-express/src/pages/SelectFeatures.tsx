import React, { useEffect, useState } from 'react';
import { MuiTableSelectable } from "../components/Tables/MuiTableSelectable";
import { useAppSelector } from "../hooks";
import { UploadedData, uploadedDataSelector } from "../features/uploaded_data/uploadedDataSlice";

const SelectFeatures: React.FC = () => {

	const [uploadedData, setUploadedData] = useState<UploadedData>({ headers: [], data: [] });

	const selectedUploadedDatas = useAppSelector(uploadedDataSelector);

	useEffect(() => {
		setUploadedData(selectedUploadedDatas);
	}, [selectedUploadedDatas]);

	return (
		<div className='container m-16 ml-28'>
			<div className='mb-8 text-3xl font-bold'>Select Features</div>
            <div className='p-8 justify-center'>
				<MuiTableSelectable data={uploadedData.data} headers={uploadedData.headers} />
			</div>
		</div>
	);
}

export default SelectFeatures;