import React, { useState } from 'react';
import { UploadedData } from "../../features/uploaded_data/uploadedDataSlice";
import { MuiTableSelectable } from "../../components/Tables/MuiTableSelectable";
import { MuiTableFull } from "../../components/Tables/MuiTableFull";
import { Button } from '@mui/material';

const UploadDataset: React.FC<{ uploadedData: UploadedData }> = ({ uploadedData }) => {

    const { data, headers } = uploadedData;

    const findDuplicates = () => {
        let entries = new Map();

        data.forEach(function (row) {
            const rowString = JSON.stringify(row);

            if (entries.has(rowString)) {
                let rowQuantity = entries.get(rowString);
                entries.set(rowString, rowQuantity + 1);
            } else {
                entries.set(rowString, 1);
            }
        });

        // Filter entries with values greater than 1
        const duplicatesArray = Array.from(entries.entries())
            .filter(([_, count]) => count > 1)
            .map(([rowString, count]) => {
                const row = JSON.parse(rowString);
                return { ...row, "Number of Duplicates Entries": count };
            });

        return duplicatesArray;
    };

    const [columnsChecked, setColumnsChecked] = useState<string[]>([]);
    const handleColumnsCheckedChange = (updatedCheckedColumns: string[]) => {
        setColumnsChecked(updatedCheckedColumns);
    }

    const handleSave = () => {
        console.log(columnsChecked);
    }

    return (
        <div className='container p-16 pt-8'>
            <div className='mb-12 text-3xl font-bold'>Handle Duplicates</div>

            <div className="grid grid-cols-12">
                <div className="col-span-12 pb-4">
                    Which Duplicates Would You Like To Merge (i.e. merge 5 rows of duplicated data into 1 row)?
                </div>
                <div className="col-span-12" style={{ maxHeight: '75vh' }}>
                    <MuiTableSelectable data={findDuplicates()} headers={["Number of Duplicates Entries"].concat(headers)} handleColumnsCheckedChange={handleColumnsCheckedChange} />
                </div>
            </div>

            <div className="mt-8">
                <Button onClick={() => handleSave()} variant="outlined">Apply Changes</Button>
            </div>
        </div>
    );
}

export default UploadDataset;