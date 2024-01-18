import React from 'react';
import { MuiTableFull } from "../../components/Tables/MuiTableFull";
import { UploadedData } from "../../features/uploaded_data/uploadedDataSlice";

const ViewFullDataset: React.FC<{ uploadedData: UploadedData }> = ({ uploadedData }) => {

	const { data, headers } = uploadedData;

	return (
		<div className='container p-16 pt-8'>
			<div className='mb-12 text-3xl font-bold'>View Full Dataset</div>
			<div className="grid grid-cols-12">
				<div className="col-span-12" style={{ maxHeight: '75vh' }}>
					<MuiTableFull data={data} headers={headers} />
				</div>
			</div>
		</div>
	);
}

export default ViewFullDataset;