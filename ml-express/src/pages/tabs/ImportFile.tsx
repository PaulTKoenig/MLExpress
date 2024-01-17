import React from 'react';
import CsvUploader from '../../components/CsvUploader';
import { MuiTableDetails } from '../../components/Tables/MuiTableDetails';
import PreviewDataModal from '../../components/PreviewDataModal';
import { useAppDispatch } from "../../hooks";
import { UploadedData, setUploadedData } from "../../features/uploaded_data/uploadedDataSlice";

const ImportFile: React.FC<UploadedData> = ({ data, headers }) => {

	const dispatch = useAppDispatch();

	const handleUpload = (dataset: UploadedData) => {
		dispatch(setUploadedData(dataset));
	};

	return (
		<>
			<div className='container p-16 pt-8'>
				<div className='mb-12 text-3xl font-bold'>Import File</div>
				<div className="grid grid-cols-12">

					{data.length > 0 ? (
						<>
							<>
								<div className=""></div>
								<div className="col-span-10" style={{ maxHeight: '75vh' }}>
									<MuiTableDetails headers={headers} data={data} />
								</div>
								<div className=""></div>
							</>

							<>
								<div className="col-span-9"></div>
								<div className="col-span-2">
									<PreviewDataModal data={data} />
								</div>
								<div className="col-span-1"></div>
							</>
						</>
					) : null}

					<>
						<div className="col-span-3"></div>
						<div className="col-span-6">
							<CsvUploader onUpload={handleUpload} />
						</div>
						<div className="col-span-3"></div>
					</>
				</div>
			</div>
		</>
	);
}

export default ImportFile;