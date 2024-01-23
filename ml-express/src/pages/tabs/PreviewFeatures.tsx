import React from 'react';
import { MuiTableDetails } from '../../components/Tables/MuiTableDetails';
import PreviewDataModal from '../../components/PreviewDataModal';
import { UploadedData } from "../../features/uploaded_data/uploadedDataSlice";

const ImportFile: React.FC<{ uploadedData: UploadedData }> = ({ uploadedData }) => {

	const { data, headers } = uploadedData;

	return (
		<>
			<div className='container p-16 pt-8'>
				<div className='mb-12 text-3xl font-bold'>Import File</div>
				
				<div className="grid grid-cols-12">

					<div className="col-span-12" style={{ maxHeight: '75vh' }}>
						<MuiTableDetails headers={headers} data={data} />
					</div>

					<div className="col-start-11 col-span-2">
						<PreviewDataModal data={data} />
					</div>

				</div>
			</div>
		</>
	);
}

export default ImportFile;