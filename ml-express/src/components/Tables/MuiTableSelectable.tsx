import * as React from 'react';
import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import { convertStringToType, getRandomExampleValue } from '../../utils';
import { useEffect, useMemo } from 'react';

interface MuiTableSelectableProps {
    data: any[];
    headers: string[];
    handleColumnsCheckedChange: (columnsToPredict: string[]) => void;
}

export const MuiTableSelectable: React.FC<MuiTableSelectableProps> = ({ data, headers, handleColumnsCheckedChange }) => {

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

    const [rowSelectionModel, setRowSelectionModel] =
        React.useState<GridRowSelectionModel>(formatRows().map((row) => row.id));

    useEffect(() => {
        let columnsCheckedChangedStrings = rowSelectionModel.map((id) => String(id));
        let columnsCheckedChanged = columnsCheckedChangedStrings.map((id) => parseInt(id, 10));

        let columnChecked = formatRows()
            .filter((row) => columnsCheckedChanged.includes(row.id))
            .map((checkedRow) => checkedRow.columnName);

        handleColumnsCheckedChange(columnChecked);
    }, [rowSelectionModel]);

    return (
        <>
            <DataGrid
                rows={formatRows()}
                columns={formatColumns()}
                checkboxSelection
                onRowSelectionModelChange={(newRowSelectionModel) => {
                    setRowSelectionModel(newRowSelectionModel);
                }}
                rowSelectionModel={rowSelectionModel}
            />
        </>
    );
}