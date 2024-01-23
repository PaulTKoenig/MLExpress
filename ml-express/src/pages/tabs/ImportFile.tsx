import React from 'react';
import CsvUploader from '../../components/CsvUploader';
import { useAppDispatch } from "../../hooks";
import { UploadedData, setUploadedData } from "../../features/uploaded_data/uploadedDataSlice";

const ImportFile: React.FC<{ handleChange: (event: React.SyntheticEvent | undefined, newValue: number) => void, }> = ({ handleChange }) => {

	const dispatch = useAppDispatch();

	const handleUpload = (dataset: UploadedData) => {
		dispatch(setUploadedData(dataset));
		handleChange(undefined, 1);
	};

	return (
		<>
			<div className='container p-16 pt-8'>
				<div className='mb-24 text-3xl font-bold'>Import File</div>
				<div className="grid grid-cols-12">

					<div className="col-start-3 col-span-9">
						<CsvUploader onUpload={handleUpload} />
					</div>

				</div>
			</div>
		</>
	);
}

export default ImportFile;