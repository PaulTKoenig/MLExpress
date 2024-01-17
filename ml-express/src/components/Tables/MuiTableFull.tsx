import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

interface MuiTableFullProps {
    data: any[];
    headers: string[];
}

export const MuiTableFull: React.FC<MuiTableFullProps> = ({ data, headers }) => {

    const formatColumns = () => {
        return headers.map(header => {
            return {
                field: header,
                headerName: header,
                minWidth: 150,
                flex: 1,
            }
        })
    }

    const formatRows = () => {
        return data.map((row, index) => ({
            ...row,
            id: index,
        }));
    };


    return (
        <>
            <DataGrid
                rows={formatRows()}
                columns={formatColumns()}
                disableRowSelectionOnClick
            />
        </>
    );
}