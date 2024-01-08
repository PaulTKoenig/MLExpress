import React, { useState } from 'react';

function convertStringToType(input: string): number | boolean | string {

    const convertedFloat = parseFloat(input);
    const convertedInteger = parseInt(input, 10);
    const convertedBoolean = input.toLowerCase() === 'true' ? true : input.toLowerCase() === 'false' ? false : null;

    if (!isNaN(convertedFloat)) {
        return convertedFloat;
    } else if (!isNaN(convertedInteger)) {
        return convertedInteger;
    } else if (convertedBoolean !== null) {
        return convertedBoolean;
    }

    // If no conversion is possible, return the original string
    return input;
}

function getRandomExampleValue(values: any[]): any {
    const randomIndex = Math.floor(Math.random() * values.length);
    return values[randomIndex];
}

interface CsvColumnInfoProps {
    headers: string[];
    data: any[];
}

const CsvColumnInfo: React.FC<CsvColumnInfoProps> = ({ headers, data }) => {

    const rowsPerPage = 15;
    const [currentPage, setCurrentPage] = useState(1);

    const totalRows = headers.length;
    const totalPages = Math.ceil(totalRows / rowsPerPage);

    const startIdx = (currentPage - 1) * rowsPerPage;
    const endIdx = currentPage * rowsPerPage;


    const getColumnStats = (columnName: string) => {
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
                type: inputType,
                min: isNaN(min) ? 'N/A' : min,
                max: isNaN(max) ? 'N/A' : max,
                mean: isNaN(mean) ? 'N/A' : mean.toFixed(2),
                nullValues,
                exampleValue,
            };
        } else {
            return {
                type: inputType,
                min: 'N/A',
                max: 'N/A',
                mean: 'N/A',
                nullValues: 'nullValues',
                exampleValue: 'exampleValue',
            };
        }
    };

    const cellStyle = { border: '1px solid #ddd', padding: '8px' };

    const getColumnDetails = (columnName: string) => {

        let columnStats = getColumnStats(columnName);

        return (
            <>
                <td style={cellStyle}>{columnName}</td>
                <td style={cellStyle}>{columnStats.type}</td>
                <td style={cellStyle}>{columnStats.min}</td>
                <td style={cellStyle}>{columnStats.max}</td>
                <td style={cellStyle}>{columnStats.mean}</td>
                <td style={cellStyle}>{columnStats.nullValues}</td>
                <td style={cellStyle}>{columnStats.exampleValue}</td>
            </>
        )
    }

    const displayPageChangeBtn = () => {
        if (totalPages > 1) {
            return (
                <div className='text-center pt-8'>
                    <button
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Previous Page
                    </button>
                    <span style={{ margin: '0 10px' }}>
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={endIdx >= totalRows}
                    >
                        Next Page
                    </button>
                </div>
            )
        }
    }

    return (
        <div>
            <table style={{ borderCollapse: 'collapse', width: '100%', marginTop: '20px' }}>
                <thead>
                    <tr>
                        <th style={cellStyle}>Column Name</th>
                        <th style={cellStyle}>Data Type</th>
                        <th style={cellStyle}>Minimum Value</th>
                        <th style={cellStyle}>Maximum Value</th>
                        <th style={cellStyle}>Mean Value</th>
                        <th style={cellStyle}>Null Values</th>
                        <th style={cellStyle}>Example Value</th>
                    </tr>
                </thead>
                <tbody>
                    {headers.slice(startIdx, endIdx).map((columnName) => (
                        <tr key={columnName}>
                            {data.length > 0 && getColumnDetails(columnName)}
                        </tr>
                    ))}
                </tbody>
            </table>
            {displayPageChangeBtn()}
        </div>
    );
};

export default CsvColumnInfo;