import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { convertStringToType, getRandomExampleValue } from '../../utils';

interface MuiTableDetailsProps {
    data: any[];
    headers: string[];
}

export const MuiTableDetails: React.FC<MuiTableDetailsProps> = ({ data, headers }) => {

    const columns: GridColDef[] = [
        {
            field: 'columnName',
            headerName: 'Column Name',
            minWidth: 150,
            flex: 1,
        },
        {
            field: 'type',
            headerName: 'Data Type',
            minWidth: 150,
            flex: 1,
        },
        {
            field: 'numDiffValues',
            headerName: 'Number of Different Values',
            minWidth: 150,
            flex: 1,
        },
        {
            field: 'min',
            headerName: 'Min Value',
            minWidth: 150,
            flex: 1,
        },
        {
            field: 'max',
            headerName: 'Max Value',
            minWidth: 150,
            flex: 1,
        },
        {
            field: 'mean',
            headerName: 'Mean Value',
            minWidth: 150,
            flex: 1,
        },
        {
            field: 'nullValues',
            headerName: 'Null Values',
            minWidth: 150,
            flex: 1,
        },
        {
            field: 'exampleValue',
            headerName: 'Example Values',
            minWidth: 150,
            flex: 1,
        },
    ];

    const getColumnStats = (columnName: string, index: number) => {
        const values = data.map((row) => row[columnName]);

        let inputType = String(typeof convertStringToType(values[0]));

        if (inputType === "number") {

            const validNumberValues = values.map((str) => parseFloat(str)).filter((num) => !isNaN(num));

            const numDiffValues = new Set(validNumberValues).size;
            const min = Math.min(...validNumberValues);
            const max = Math.max(...validNumberValues);
            const nullValues = values.filter((value) => value === null).length;
            const exampleValue = getRandomExampleValue(values);

            if (numDiffValues <= 10) {
                return {
                    id: index,
                    columnName: columnName,
                    type: "categorical",
                    numDiffValues: numDiffValues,
                    min: isNaN(min) ? 'N/A' : min,
                    max: isNaN(max) ? 'N/A' : max,
                    mean: 'N/A',
                    nullValues,
                    exampleValue,
                };
            } else {
                
                const mean = validNumberValues.reduce((sum, value) => sum + value, 0) / validNumberValues.length;

                return {
                    id: index,
                    columnName: columnName,
                    type: inputType,
                    numDiffValues: numDiffValues,
                    min: isNaN(min) ? 'N/A' : min,
                    max: isNaN(max) ? 'N/A' : max,
                    mean: isNaN(mean) ? 'N/A' : mean.toFixed(2),
                    nullValues,
                    exampleValue,
                };
            }
        } else {
            return {
                id: index,
                columnName: columnName,
                type: inputType,
                numDiffValues: 'N/A',
                min: 'N/A',
                max: 'N/A',
                mean: 'N/A',
                nullValues: 'nullValues',
                exampleValue: 'exampleValue',
            };
        }
    };

    const formatRows = () => {
        return headers.map((columnName, index) => (getColumnStats(columnName, index)));
    };


    return (
        <>
            <DataGrid
                rows={formatRows()}
                columns={columns}
                disableRowSelectionOnClick
            />
        </>
    );
}