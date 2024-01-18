import React, { useEffect, useState } from 'react';
import { MuiTableSelectable } from "../../components/Tables/MuiTableSelectable";
import DropdownSelect from "../../components/DropdownSelect";
import { useAppDispatch } from "../../hooks";
import { UploadedData, setUploadedData } from "../../features/uploaded_data/uploadedDataSlice";
import Button from '@mui/material/Button';

const SelectFeatures: React.FC<{ uploadedData: UploadedData }> = ({ uploadedData }) => {

	const { data, headers } = uploadedData;

	const [columnsToPredict, setColumnsToPredict] = useState<string[]>([]);
	const [outcome, setOutcome] = useState<string>("");

	useEffect(() => {
		setOutcome(headers[0]);
	}, [headers]);

	const dispatch = useAppDispatch();

	const handleOutcome = (updatedSelection: string) => {
		setOutcome(updatedSelection);
	}

	const handleColumnsCheckedChange = (columnsToPredict: string[]) => {
		setColumnsToPredict(columnsToPredict);
		console.log(columnsToPredict);
	}

	const handleSave = () => {
		dispatch(setUploadedData({ headers: headers, data: data, predictedFeature: outcome, columnsToPredict: columnsToPredict }));
	}

	return (
		<div className='container p-16 pt-8'>
			<div className='mb-12 text-3xl font-bold'>Select Features</div>

			<>
				<div className="grid grid-cols-12">
					<div className=""></div>
					<div className="flex col-span-12 items-center">
						<div className='pr-8'>
							Select a Feature To Predict:

						</div>
						<div>
							<DropdownSelect options={headers} label={"Feature"} selection={outcome} handleChange={handleOutcome} />
						</div>
					</div>
				</div>
			</>

			<>
				<div className="grid grid-cols-12 pt-8">
					<div className="col-span-12 pb-4">
						Features to Predict With:
					</div>
					<div className="col-span-12" style={{ maxHeight: '75vh' }}>
						<MuiTableSelectable data={data} headers={headers} predictedValue={outcome} handleColumnsCheckedChange={handleColumnsCheckedChange} />
					</div>
				</div>
			</>

			<div className="pt-8">
				<Button onClick={() => handleSave()} variant="outlined">Save Data</Button>
			</div>
		</div>
	);
}

export default SelectFeatures;