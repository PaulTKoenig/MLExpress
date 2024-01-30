import * as React from 'react';
import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import { convertStringToType, getRandomExampleValue } from '../../utils';
import { useEffect, useMemo, useState } from 'react';

interface MuiTableSelectableOutcomeProps {
  data: any[];
  headers: string[];
  predictedValue: string;
  handleColumnsCheckedChange: (columnsToPredict: string[]) => void;
}

export const MuiTableSelectableOutcome: React.FC<MuiTableSelectableOutcomeProps> = ({ data, headers, predictedValue, handleColumnsCheckedChange }) => {

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

    const inputType = typeof convertStringToType(values[0]);

    if (inputType === 'number') {

      const validNumberValues = values.map((str) => parseFloat(str)).filter((num) => !isNaN(num));

      const min = Math.min(...validNumberValues);
      const max = Math.max(...validNumberValues);
      const mean = validNumberValues.reduce((sum, value) => sum + value, 0) / validNumberValues.length;
      const nullValues = values.filter((value) => value === null).length;
      const exampleValue = getRandomExampleValue(values);

      return {
        id: index,
        columnName: columnName,
        type: inputType,
        min: isNaN(min) ? 'N/A' : min,
        max: isNaN(max) ? 'N/A' : max,
        mean: isNaN(mean) ? 'N/A' : mean.toFixed(2),
        nullValues,
        exampleValue,
      };
    } else {
      return {
        id: index,
        columnName: columnName,
        type: inputType,
        min: 'N/A',
        max: 'N/A',
        mean: 'N/A',
        nullValues: 'nullValues',
        exampleValue: 'exampleValue',
      };
    }
  };

  const formatRows = () => {
    return headers
      .map((columnName, index) => getColumnStats(columnName, index));
  };

  const formattedRows = useMemo(() => {
		return formatRows();
	  }, [headers]);

  const [displayedRows, setDisplayedRows] = useState(formattedRows.filter(row => row.columnName !== predictedValue));

  const [rowSelectionModel, setRowSelectionModel] =
    React.useState<GridRowSelectionModel>(formattedRows.map((row) => row.id));

  useEffect(() => {
    setDisplayedRows(formattedRows.filter(row => row.columnName !== predictedValue));
    setRowSelectionModel(formattedRows.map((row) => row.id));
  }, [predictedValue]);

  useEffect(() => {
    let columnsCheckedChangedStrings = rowSelectionModel.map((id) => String(id));
    let columnsCheckedChanged = columnsCheckedChangedStrings.map((id) => parseInt(id, 10));

    let columnChecked = formattedRows
                          .filter((row) => columnsCheckedChanged.includes(row.id))
                          .map((checkedRow) => checkedRow.columnName);

    handleColumnsCheckedChange(columnChecked);
  }, [rowSelectionModel]);

  return (
    <>
      <DataGrid
        rows={displayedRows}
        columns={columns}
        checkboxSelection
        onRowSelectionModelChange={(newRowSelectionModel) => {
          setRowSelectionModel(newRowSelectionModel);
        }}
        rowSelectionModel={rowSelectionModel}
      />
    </>
  );
}