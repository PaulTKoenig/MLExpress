import React from 'react';

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

    return (
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
                {headers.map((columnName) => (
                    <tr key={columnName}>
                        {data.length > 0 && getColumnDetails(columnName)}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default CsvColumnInfo;