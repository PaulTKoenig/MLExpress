import React, { useEffect, useState } from 'react';
import { useAppSelector } from "../hooks";
import { UploadedData, uploadedDataSelector } from "../features/uploaded_data/uploadedDataSlice";
import { MuiTableFull } from "../components/Tables/MuiTableFull";

const UploadDataset: React.FC = () => {

    const [uploadedData, setUploadedData] = useState<UploadedData>({ headers: [], data: [] });

    const selectedUploadedDatas = useAppSelector(uploadedDataSelector);

    useEffect(() => {
        setUploadedData(selectedUploadedDatas);
    }, [selectedUploadedDatas]);

    const findDuplicates = () => {
        let entries = new Map();

        uploadedData.data.forEach(function (row) {
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
                return { ...row, 'Number of Duplicates Entries': count };
            });

        return duplicatesArray;
    };

    return (
        <div className='container m-16 ml-28'>
            <div className='mb-8 text-3xl font-bold'>Handle Duplicates</div>
            <div className='p-8 justify-center'>
                <MuiTableFull data={findDuplicates()} headers={uploadedData.headers} />
            </div>
        </div>
    );
}

export default UploadDataset;