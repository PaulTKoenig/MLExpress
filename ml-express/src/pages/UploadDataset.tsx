import React, { useEffect, useState } from 'react';
import CsvUploader from '../components/CsvUploader';
import CsvTableDetails from '../components/Tables/CsvTableDetails';
import PreviewDataModal from '../components/PreviewDataModal';
import { useAppDispatch, useAppSelector } from "../hooks";
import { UploadedData, setUploadedData, uploadedDataSelector } from "../features/uploaded_data/uploadedDataSlice";

const UploadDataset: React.FC = () => {

	const [csvData, setCsvData] = useState<UploadedData>({ headers: [], data: [] });

	const selectedUploadedData = useAppSelector(uploadedDataSelector);
	const dispatch = useAppDispatch();

	useEffect(() => {
		setCsvData(selectedUploadedData);
	}, [selectedUploadedData]);

	const handleUpload = (dataset: UploadedData) => {
		setCsvData(dataset);
		dispatch(setUploadedData(dataset));
	};

	return (
		<>
			<div className='container m-16 ml-28'>
				<div className='text-3xl font-bold'>Upload Dataset</div>
				<div className='p-16 justify-center'>
					{csvData.data.length > 0 ? (
						<>
							<CsvTableDetails headers={csvData.headers} data={csvData.data} />
							<PreviewDataModal data={csvData.data} />
						</>
					) : null}
					<div className='translate-x-1/2 w-1/2'>
						<CsvUploader onUpload={handleUpload} />
					</div>
				</div>
			</div>
		</>
	);
}

export default UploadDataset;