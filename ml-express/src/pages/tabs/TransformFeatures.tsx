import React, { useState } from 'react';
import { MuiTableSelectableDetails } from "../../components/Tables/MuiTableSelectableDetails";
import DropdownSelect from "../../components/DropdownSelect";
import { useAppDispatch } from "../../hooks";
import { UploadedData } from "../../features/uploaded_data/uploadedDataSlice";
import Button from '@mui/material/Button';

const TransformFeatures: React.FC<{ uploadedData: UploadedData }> = ({ uploadedData }) => {

    const { data, headers } = uploadedData;

    const [columnsChecked, setColumnsChecked] = useState<string[]>([]);

    const transformations = ['Absolute Maximum Scaling', 'Normalization', 'Min-Max Scaling', 'Standardization', 'Robust Scaling']
    const [outcome, setOutcome] = useState<string>(transformations[0]);

    const dispatch = useAppDispatch();

    const handleOutcome = (updatedSelection: string) => {
        setOutcome(updatedSelection);
    }

    const handleColumnsCheckedChange = (updatedCheckedColumns: string[]) => {
        setColumnsChecked(updatedCheckedColumns);
    }

    const handleSave = () => {
        console.log(columnsChecked)
    }

    return (
        <div className='container p-16 pt-8'>
            <div className='mb-12 text-3xl font-bold'>Select Features</div>

            <div className="grid grid-cols-12">
                <div className="flex col-span-10 items-center">
                    <div className='pr-8'>
                        Select a Scaling Technique:

                    </div>
                    <div>
                        <DropdownSelect options={transformations} label={"Scaler"} selection={outcome} handleChange={handleOutcome} />
                    </div>
                </div>
                <div className="flex col-span-2 items-center">
                    <div>
                        <Button onClick={() => handleSave()} variant="outlined">Apply Scaling</Button>
                    </div>
                </div>
            </div>


            <div className="grid grid-cols-12 pt-12">
                <div className="col-span-12 pb-4">
                    Which Features Would You Like to Scale?
                </div>
                <div className="col-span-12" style={{ maxHeight: '75vh' }}>
                    <MuiTableSelectableDetails data={data} headers={headers} handleColumnsCheckedChange={handleColumnsCheckedChange} />
                </div>
            </div>
        </div>
    );
}

export default TransformFeatures;