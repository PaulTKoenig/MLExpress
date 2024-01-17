import React from 'react';
import { MuiTableSelectable } from "../../components/Tables/MuiTableSelectable";
import { UploadedData } from "../../features/uploaded_data/uploadedDataSlice";

const SelectFeatures: React.FC<UploadedData> = ({ data, headers }) => {

	return (
		<div className='container p-16 pt-8'>
			<div className='mb-12 text-3xl font-bold'>Select Features</div>
			<div className="grid grid-cols-12">
				<div className=""></div>
				<div className="col-span-10" style={{ maxHeight: '75vh' }}>
					<MuiTableSelectable data={data} headers={headers} />
				</div>
				<div className=""></div>
			</div>
		</div>
	);
}

export default SelectFeatures;